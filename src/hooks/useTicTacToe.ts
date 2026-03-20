import { useEffect, useState } from "react";
import { useGameSession } from "../context/GameSessionContext";
import type { GameResult, GameSettings, Player } from "../types/game.types";
import { checkWinner, createEmptyBoard, getBotMove } from "../utils/helpers";

export function useTicTacToe(settings: GameSettings) {
  const { state, dispatch } = useGameSession();

  const [board, setBoard] = useState(createEmptyBoard(settings.boardSize));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [result, setResult] = useState<GameResult>(null);

  const resetBoardState = () => {
    setBoard(createEmptyBoard(settings.boardSize));
    setCurrentPlayer("X");
    setResult(null);
  };

  const finishRound = (gameResult: GameResult) => {
    setResult(gameResult);
    dispatch({ type: "APPLY_RESULT", payload: gameResult });
  };

  const makeMove = (index: number, player: Player) => {
    setBoard((prevBoard) => {
      if (prevBoard[index] !== null || result !== null) {
        return prevBoard;
      }

      const updatedBoard = [...prevBoard];
      updatedBoard[index] = player;

      const gameResult = checkWinner(updatedBoard, settings.boardSize);

      if (gameResult !== null) {
        finishRound(gameResult);
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
    dispatch({ type: "NEXT_ROUND" });
    resetBoardState();
  };

  const restartCurrentRound = () => {
    if (result !== null) {
      dispatch({ type: "ROLLBACK_RESULT", payload: result });
    }

    resetBoardState();
  };

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
    round: state.round,
    score: state.score,
    handleCellClick,
    startNextRound,
    restartCurrentRound,
  };
}