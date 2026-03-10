import { useState } from "react";
import type { Page, GameResult } from "../types/game.types";

export function useApp() {
  const [page, setPage] = useState<Page>("start");
  const [result, setResult] = useState<GameResult>(null);

  const startGame = () => {
    setResult(null);
    setPage("game");
  };

  const finishGame = (res: GameResult) => {
    setResult(res);
    setPage("result");
  };

  const goToStart = () => {
    setResult(null);
    setPage("start");
  };

  return {
    page,
    result,
    startGame,
    finishGame,
    goToStart,
  };
}