import { useForm } from "react-hook-form";
import { useGameSettings } from "../../context/GameSettingsContext";
import type {
  BoardSize,
  BotMoveDelay,
  Difficulty,
  GameSettings,
} from "../../types/game.types";

interface GameSettingsFormProps {
  onSubmitSuccess: () => void;
}

function GameSettingsForm({ onSubmitSuccess }: GameSettingsFormProps) {
  const { settings, updateSettings } = useGameSettings();

  const { register, handleSubmit } = useForm<GameSettings>({
    defaultValues: settings,
  });

  const onSubmit = (data: GameSettings) => {
    updateSettings({
      difficulty: data.difficulty as Difficulty,
      boardSize: Number(data.boardSize) as BoardSize,
      botMoveDelay: Number(data.botMoveDelay) as BotMoveDelay,
    });

    onSubmitSuccess();
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" {...register("difficulty")}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="boardSize">Board size</label>
        <select id="boardSize" {...register("boardSize")}>
          <option value={3}>3 x 3</option>
          <option value={4}>4 x 4</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="botMoveDelay">Bot speed</label>
        <select id="botMoveDelay" {...register("botMoveDelay")}>
          <option value={300}>Fast</option>
          <option value={700}>Normal</option>
          <option value={1200}>Slow</option>
        </select>
      </div>

      <button type="submit" className="btn">
        Start game
      </button>
    </form>
  );
}

export default GameSettingsForm;