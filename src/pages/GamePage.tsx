import Board from "../components/Board/Board";
import { createEmptyBoard } from "../utils/helpers";

interface GamePageProps {
  onBackToStart: () => void;
}

function GamePage({ onBackToStart }: GamePageProps) {
  return (
    <div className="page game-page">
      <h2>Game</h2>
      <p>Game logic will be added in the next commit.</p>

      <Board
        board={createEmptyBoard()}
        onCellClick={() => {}}
      />

      <button className="btn" onClick={onBackToStart}>
        Back to settings
      </button>
    </div>
  );
}

export default GamePage;