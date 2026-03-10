import { useEffect, useState } from "react";
import type { GameResult, GameSettings, Player } from "../types/game.types";
import { checkWinner, createEmptyBoard, getBotMove } from "../utils/helpers";

interface ScoreState {
  X: number;
  O: number;
  draws: number;
}

const initialScore: ScoreState = {
  X: 0,
  O: 0,
  draws: 0,
};

export function useTicTacToe(settings: GameSettings) {
  const [board, setBoard] = useState(createEmptyBoard(settings.boardSize));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [result, setResult] = useState<GameResult>(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState<ScoreState>(initialScore);

  const updateScore = (gameResult: GameResult) => {
    setScore((prev) => {
      if (gameResult === "X") {
        return { ...prev, X: prev.X + 1 };
      }

      if (gameResult === "O") {
        return { ...prev, O: prev.O + 1 };
      }

      if (gameResult === "draw") {
        return { ...prev, draws: prev.draws + 1 };
      }

      return prev;
    });
  };

  const rollbackScore = (gameResult: GameResult) => {
    setScore((prev) => {
      if (gameResult === "X") {
        return { ...prev, X: Math.max(0, prev.X - 1) };
      }

      if (gameResult === "O") {
        return { ...prev, O: Math.max(0, prev.O - 1) };
      }

      if (gameResult === "draw") {
        return { ...prev, draws: Math.max(0, prev.draws - 1) };
      }

      return prev;
    });
  };

  const resetBoardState = () => {
    setBoard(createEmptyBoard(settings.boardSize));
    setCurrentPlayer("X");
    setResult(null);
  };

  const finishRound = (gameResult: GameResult) => {
    setResult(gameResult);
    updateScore(gameResult);
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
    setRound((prev) => prev + 1);
    resetBoardState();
  };

  const restartCurrentRound = () => {
    if (result !== null) {
      rollbackScore(result);
    }

    resetBoardState();
  };

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