import { createPortal } from "react-dom";
import type { GameResult } from "../../types/game.types";

interface GameOverModalProps {
  isOpen: boolean;
  result: GameResult;
  round: number;
  onNextRound: () => void;
  onRestartRound: () => void;
}

function GameOverModal({
  isOpen,
  result,
  round,
  onNextRound,
  onRestartRound,
}: GameOverModalProps) {
  if (!isOpen) {
    return null;
  }

  const resultText =
    result === "draw" ? "The round ended in a draw." : `Winner: ${result}`;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-window">
        <h3>Game over</h3>
        <p>Round {round} is finished.</p>
        <p>{resultText}</p>

        <div className="modal-actions">
          <button className="btn" onClick={onNextRound}>
            Next round
          </button>

          <button className="btn secondary-btn" onClick={onRestartRound}>
            Restart this round
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default GameOverModal;