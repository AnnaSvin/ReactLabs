export type Page = "start" | "game";

export type Player = "X" | "O";

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameResult = Player | "draw" | null;

export type Difficulty = "easy" | "medium" | "hard";

export type BoardSize = 3 | 4;

export type BotMoveDelay = 300 | 700 | 1200;

export interface GameSettings {
  difficulty: Difficulty;
  boardSize: BoardSize;
  botMoveDelay: BotMoveDelay;
}