import { useNavigate, useParams } from "react-router-dom";
import Board from "../components/Board/Board";
import GameOverModal from "../components/GameOverModal/GameOverModal";
import { useGameStore } from "../store/gameStore";
import { useTicTacToe } from "../hooks/useTicTacToe";
import styles from "./GamePage.module.css";

function GamePage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const settings = useGameStore((state) => state.settings);
  const resetSession = useGameStore((state) => state.resetSession);

  const {
    board,
    currentPlayer,
    result,
    round,
    score,
    handleCellClick,
    startNextRound,
    restartCurrentRound,
  } = useTicTacToe(settings, userId ?? "guest");

  const handleBackToSettings = () => {
    resetSession();
    navigate(`/${userId}/settings`);
  };

  return (
    <div className={styles.page}>
      <h2>Game</h2>

      <div className={styles.info}>
        <p>User: {userId}</p>
        <p>Round: {round}</p>
        <p>Current player: {currentPlayer}</p>
        <p>Difficulty: {settings.difficulty}</p>
        <p>
          Board size: {settings.boardSize} x {settings.boardSize}
        </p>
      </div>

      <div className={styles.scoreBoard}>
        <span>X: {score.X}</span>
        <span>O: {score.O}</span>
        <span>Draws: {score.draws}</span>
      </div>

      <Board
        board={board}
        boardSize={settings.boardSize}
        onCellClick={handleCellClick}
      />

      <button className="btn" onClick={handleBackToSettings}>
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