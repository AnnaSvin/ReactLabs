import Button from "../components/Button/Button";

interface StartPageProps {
  onStart: () => void;
}

function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="page start-page">
      <h1>Хрестики-нулики</h1>
      <Button text="Почати гру" onClick={onStart} />
    </div>
  );
}

export default StartPage;