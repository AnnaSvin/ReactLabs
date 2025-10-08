import { useState } from "react";
import "./index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [page, setPage] = useState<"start" | "game" | "result">("start");
  const [result, setResult] = useState<string | null>(null);

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