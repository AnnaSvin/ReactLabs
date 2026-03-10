import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import { useApp } from "./hooks/useApp";

function App() {
  const { page, startGame, goToStart } = useApp();

  return (
    <div className="app">
      {page === "start" && <StartPage onStart={startGame} />}
      {page === "game" && <GamePage onBackToStart={goToStart} />}
    </div>
  );
}

export default App;