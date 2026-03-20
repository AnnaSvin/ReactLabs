import GameSettingsForm from "../components/GameSettingsForm/GameSettingsForm";
import styles from "./StartPage.module.css";

function StartPage() {
  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Game settings</h2>
      <p className={styles.description}>
        Choose the game parameters before starting a new match.
      </p>

      <GameSettingsForm />
    </div>
  );
}

export default StartPage;