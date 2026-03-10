import GameSettingsForm from "../components/GameSettingsForm/GameSettingsForm";

interface StartPageProps {
  onStart: () => void;
}

function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="page start-page">
      <h1>Хрестики-нулики</h1>
      <p className="page-description">Choose game settings before starting.</p>

      <GameSettingsForm onSubmitSuccess={onStart} />
    </div>
  );
}

export default StartPage;