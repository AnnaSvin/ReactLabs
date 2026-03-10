import type {
  BoardState,
  Difficulty,
  GameResult,
  Player,
} from "../types/game.types";

export function createEmptyBoard(boardSize: number): BoardState {
  return Array(boardSize * boardSize).fill(null);
}

export function getAvailableMoves(board: BoardState): number[] {
  return board
    .map((cell, index) => (cell === null ? index : -1))
    .filter((index) => index !== -1);
}

export function checkWinner(board: BoardState, boardSize: number): GameResult {
  const lines: number[][] = [];

  for (let row = 0; row < boardSize; row++) {
    const rowLine: number[] = [];

    for (let col = 0; col < boardSize; col++) {
      rowLine.push(row * boardSize + col);
    }

    lines.push(rowLine);
  }

  for (let col = 0; col < boardSize; col++) {
    const colLine: number[] = [];

    for (let row = 0; row < boardSize; row++) {
      colLine.push(row * boardSize + col);
    }

    lines.push(colLine);
  }

  const mainDiagonal: number[] = [];
  const secondaryDiagonal: number[] = [];

  for (let i = 0; i < boardSize; i++) {
    mainDiagonal.push(i * boardSize + i);
    secondaryDiagonal.push(i * boardSize + (boardSize - 1 - i));
  }

  lines.push(mainDiagonal, secondaryDiagonal);

  for (const line of lines) {
    const firstValue = board[line[0]];

    if (!firstValue) {
      continue;
    }

    const isWinningLine = line.every((index) => board[index] === firstValue);

    if (isWinningLine) {
      return firstValue;
    }
  }

  if (board.every((cell) => cell !== null)) {
    return "draw";
  }

  return null;
}

function findImmediateMove(
  board: BoardState,
  boardSize: number,
  player: Player
): number | null {
  const availableMoves = getAvailableMoves(board);

  for (const move of availableMoves) {
    const testBoard = [...board];
    testBoard[move] = player;

    if (checkWinner(testBoard, boardSize) === player) {
      return move;
    }
  }

  return null;
}

function getRandomMove(board: BoardState): number {
  const availableMoves = getAvailableMoves(board);
  const randomIndex = Math.floor(Math.random() * availableMoves.length);

  return availableMoves[randomIndex];
}

export function getBotMove(
  board: BoardState,
  boardSize: number,
  difficulty: Difficulty
): number {
  const winningMove = findImmediateMove(board, boardSize, "O");
  const blockingMove = findImmediateMove(board, boardSize, "X");

  if (difficulty === "easy") {
    return getRandomMove(board);
  }

  if (difficulty === "medium") {
    if (winningMove !== null) {
      return winningMove;
    }

    return getRandomMove(board);
  }

  if (winningMove !== null) {
    return winningMove;
  }

  if (blockingMove !== null) {
    return blockingMove;
  }

  const centerIndex = Math.floor(board.length / 2);

  if (boardSize === 3 && board[centerIndex] === null) {
    return centerIndex;
  }

  const corners = [
    0,
    boardSize - 1,
    boardSize * (boardSize - 1),
    boardSize * boardSize - 1,
  ].filter((index) => board[index] === null);

  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  return getRandomMove(board);
}