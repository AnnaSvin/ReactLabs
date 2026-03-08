import Board from "../components/Board/Board";

interface GamePageProps {
  onGameEnd: (result: string) => void;
}

function GamePage({ onGameEnd }: GamePageProps) {
  return (
    <div className="page game-page">
      <h2>Гра</h2>
      <Board />
      <button className="end-btn" onClick={() => onGameEnd("Нічия")}>
        Завершити гру
      </button>
    </div>
  );
}

export default GamePage;