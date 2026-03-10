import Board from "../components/Board/Board";
import { useTicTacToe } from "../hooks/useTicTacToe";
import type { GameResult } from "../types/game.types";

interface GamePageProps {
  onGameEnd: (result: GameResult) => void;
}

function GamePage({ onGameEnd }: GamePageProps) {
  const { board, currentPlayer, handleCellClick } = useTicTacToe(onGameEnd);

  return (
    <div className="page game-page">
      <h2>Гра</h2>
      <p>Поточний гравець: {currentPlayer}</p>

      <Board board={board} 
      onCellClick={handleCellClick} 
      />
    </div>
  );
}

export default GamePage;