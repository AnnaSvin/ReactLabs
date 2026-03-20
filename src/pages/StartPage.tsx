import { useParams } from "react-router-dom";
import GameSettingsForm from "../components/GameSettingsForm/GameSettingsForm";

function StartPage() {
  const { userId } = useParams();

  return (
    <div className="page start-page">
      <h1>Хрестики-нулики</h1>
      <p className="page-description">User: {userId}</p>
      <p className="page-description">Choose game settings before starting.</p>

      <GameSettingsForm />
    </div>
  );
}

export default StartPage;