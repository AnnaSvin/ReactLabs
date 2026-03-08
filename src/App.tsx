import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import type { Page, GameResult } from "./types/game.types";

function App() {
  const [page, setPage] = useState<Page>("start");
const [result, setResult] = useState<GameResult>(null);

  return (
    <div className="app">
      {page === "start" && <StartPage onStart={() => setPage("game")} />}
      {page === "game" && (
        <GamePage
          onGameEnd={(res: string) => {
            setResult(res);
            setPage("result");
          }}
        />
      )}
      {page === "result" && (
        <ResultPage result={result} onRestart={() => setPage("start")} />
      )}
    </div>
  );
}

export default App