import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isSettingsPage = location.pathname.includes("/settings");
  const isGamePage = location.pathname.includes("/game");

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Tic-Tac-Toe</h1>
          <p className={styles.subtitle}>Player ID: {userId}</p>
        </div>

        <nav className={styles.nav}>
          <button
            className={`${styles.navBtn} ${
              isSettingsPage ? styles.activeNavBtn : ""
            }`}
            onClick={() => navigate(`/${userId}/settings`)}
          >
            Settings
          </button>

          <button
            className={`${styles.navBtn} ${
              isGamePage ? styles.activeNavBtn : ""
            }`}
            onClick={() => navigate(`/${userId}/game`)}
          >
            Game
          </button>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;