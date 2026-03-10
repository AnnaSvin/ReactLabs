import Board from "../components/Board/Board";
import GameOverModal from "../components/GameOverModal/GameOverModal";
import { useGameSettings } from "../context/GameSettingsContext";
import { useTicTacToe } from "../hooks/useTicTacToe";

interface GamePageProps {
  onBackToStart: () => void;
}

function GamePage({ onBackToStart }: GamePageProps) {
  const { settings } = useGameSettings();
  const {
    board,
    currentPlayer,
    result,
    round,
    score,
    handleCellClick,
    startNextRound,
    restartCurrentRound,
  } = useTicTacToe(settings);

  return (
    <div className="page game-page">
      <h2>Game</h2>

      <div className="game-info">
        <p>Round: {round}</p>
        <p>Current player: {currentPlayer}</p>
        <p>Difficulty: {settings.difficulty}</p>
        <p>Board size: {settings.boardSize} x {settings.boardSize}</p>
      </div>

      <div className="score-board">
        <span>X: {score.X}</span>
        <span>O: {score.O}</span>
        <span>Draws: {score.draws}</span>
      </div>

      <Board
        board={board}
        boardSize={settings.boardSize}
        onCellClick={handleCellClick}
      />

      <button className="btn" onClick={onBackToStart}>
        Back to settings
      </button>

      <GameOverModal
        isOpen={result !== null}
        result={result}
        round={round}
        onNextRound={startNextRound}
        onRestartRound={restartCurrentRound}
      />
    </div>
  );
}

export default GamePage;