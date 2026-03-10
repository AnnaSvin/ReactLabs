import { useState } from "react";
import type { Page } from "../types/game.types";

export function useApp() {
  const [page, setPage] = useState<Page>("start");

  const startGame = () => {
    setPage("game");
  };

  const goToStart = () => {
    setPage("start");
  };

  return {
    page,
    startGame,
    goToStart,
  };
}