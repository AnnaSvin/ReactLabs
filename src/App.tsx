import { useState } from "react";
import "./index.css";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

function App() {
  const [page, setPage] = useState<"start" | "game" | "result">("start");

  return (
    <div className="app">
      {page === "start" && <StartPage onStart={() => setPage("game")} />}
      {page === "game" && (
        <GamePage
          onGameEnd={(res: string) => {
            setPage("result");
          }}
        />
      )}
    </div>
  );
}

export default App