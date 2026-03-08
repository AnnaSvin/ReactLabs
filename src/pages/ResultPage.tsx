import Button from "../components/Button/Button";

interface ResultPageProps {
  result: string | null;
  onRestart: () => void;
}

function ResultPage({ result, onRestart }: ResultPageProps) {
  return (
    <div className="page result-page">
      <h2>Результат гри</h2>
      <p>Переможець: {result ?? "Невідомо"}</p>
      <Button text="Повернутися на старт" onClick={onRestart} />
    </div>
  );
}

export default ResultPage;