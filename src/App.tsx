import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";
import { useApp } from "./hooks/useApp";

function App() {
  const { page, result, startGame, finishGame, goToStart } = useApp();

  return (
    <div className="app">
      {page === "start" && <StartPage onStart={startGame} />}

      {page === "game" && <GamePage onGameEnd={finishGame} />}

      {page === "result" && (
        <ResultPage result={result} onRestart={goToStart} />
      )}
    </div>
  );
}

export default App;