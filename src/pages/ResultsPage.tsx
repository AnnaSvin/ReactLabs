import { useNavigate, useParams } from "react-router-dom";
import { useGameStore } from "../store/gameStore";
import styles from "./ResultsPage.module.css";

function ResultsPage() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const allResults = useGameStore((state) => state.results ?? []);
  const clearResults = useGameStore((state) => state.clearResults);

  const results = allResults.filter((record) => record.userId === userId);

  const handleClearResults = () => {
    clearResults();
  };

  return (
    <div className={styles.page}>
      <h2>Results table</h2>
      <p className={styles.description}>Player: {userId}</p>

      {results.length === 0 ? (
        <p className={styles.empty}>No results yet.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Round</th>
                <th>Result</th>
                <th>Difficulty</th>
                <th>Board</th>
                <th>Played at</th>
              </tr>
            </thead>

            <tbody>
              {results.map((record) => (
                <tr key={record.id}>
                  <td>{record.round}</td>
                  <td>{record.result}</td>
                  <td>{record.difficulty}</td>
                  <td>
                    {record.boardSize} x {record.boardSize}
                  </td>
                  <td>{new Date(record.playedAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className={styles.actions}>
        <button className="btn" onClick={() => navigate(`/${userId}/game`)}>
          Back to game
        </button>

        <button className="btn secondary-btn" onClick={handleClearResults}>
          Clear results
        </button>
      </div>
    </div>
  );
}

export default ResultsPage;