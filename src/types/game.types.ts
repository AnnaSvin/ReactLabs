export type Page = "start" | "game" | "result";

export type Player = "X" | "O";

export type CellValue = Player | null;

export type BoardState = CellValue[];

export type GameResult = Player | "draw" | null;