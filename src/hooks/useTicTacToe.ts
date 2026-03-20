import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../store/gameStore";
import type { GameResult, GameSettings, Player } from "../types/game.types";
import { checkWinner, createEmptyBoard, getBotMove } from "../utils/helpers";

export function useTicTacToe(settings: GameSettings, userId: string) {
  const round = useGameStore((state) => state.round);
  const score = useGameStore((state) => state.score);
  const nextRound = useGameStore((state) => state.nextRound);
  const applyResult = useGameStore((state) => state.applyResult);
  const rollbackResult = useGameStore((state) => state.rollbackResult);
  const addResultRecord = useGameStore((state) => state.addResultRecord);
  const removeLastResultRecord = useGameStore((state) => state.removeLastResultRecord);

  const [board, setBoard] = useState(createEmptyBoard(settings.boardSize));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [result, setResult] = useState<GameResult>(null);

  const isResultHandledRef = useRef(false);

  const resetBoardState = () => {
    setBoard(createEmptyBoard(settings.boardSize));
    setCurrentPlayer("X");
    setResult(null);
    isResultHandledRef.current = false;
  };

  const makeMove = (index: number, player: Player) => {
    if (result !== null) {
      return;
    }

    setBoard((prevBoard) => {
      if (prevBoard[index] !== null) {
        return prevBoard;
      }

      const updatedBoard = [...prevBoard];
      updatedBoard[index] = player;

      const gameResult = checkWinner(updatedBoard, settings.boardSize);

      if (gameResult !== null) {
        setResult(gameResult);
      } else {
        setCurrentPlayer(player === "X" ? "O" : "X");
      }

      return updatedBoard;
    });
  };

  const handleCellClick = (index: number) => {
    if (currentPlayer !== "X" || result !== null) {
      return;
    }

    makeMove(index, "X");
  };

  const startNextRound = () => {
    nextRound();
    resetBoardState();
  };

  const restartCurrentRound = () => {
    if (result !== null && isResultHandledRef.current) {
      rollbackResult(result);
      removeLastResultRecord();
    }

    resetBoardState();
  };

  useEffect(() => {
    if (result === null || isResultHandledRef.current) {
      return;
    }

    applyResult(result);
    addResultRecord({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId,
      round,
      result,
      difficulty: settings.difficulty,
      boardSize: settings.boardSize,
      playedAt: new Date().toISOString(),
    });

    isResultHandledRef.current = true;
  }, [result, userId, round, settings, applyResult, addResultRecord]);

  useEffect(() => {
    resetBoardState();
  }, [settings.boardSize]);

  useEffect(() => {
    if (currentPlayer !== "O" || result !== null) {
      return;
    }

    const timer = window.setTimeout(() => {
      const botMove = getBotMove(board, settings.boardSize, settings.difficulty);
      makeMove(botMove, "O");
    }, settings.botMoveDelay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [board, currentPlayer, result, settings]);

  return {
    board,
    currentPlayer,
    result,
    round,
    score,
    handleCellClick,
    startNextRound,
    restartCurrentRound,
  };
}