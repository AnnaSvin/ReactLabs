import { useState } from "react";
import { createEmptyBoard, checkWinner } from "../utils/helpers";
import type { BoardState, Player, GameResult } from "../types/game.types";

export function useTicTacToe(onGameEnd?: (res: GameResult) => void) {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const handleCellClick = (index: number) => {
    if (board[index]) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    const result = checkWinner(newBoard);

    setBoard(newBoard);

    if (result) {
      onGameEnd?.(result);
      return;
    }

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const restartGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("X");
  };

  return {
    board,
    currentPlayer,
    handleCellClick,
    restartGame,
  };
}