import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";

function AppLayout() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isSettingsPage = location.pathname.includes("/settings");
  const isGamePage = location.pathname.includes("/game");

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1 className="app-title">Tic-Tac-Toe</h1>
          <p className="app-subtitle">Player ID: {userId}</p>
        </div>

        <nav className="app-nav">
          <button
            className={`nav-btn ${isSettingsPage ? "active-nav-btn" : ""}`}
            onClick={() => navigate(`/${userId}/settings`)}
          >
            Settings
          </button>

          <button
            className={`nav-btn ${isGamePage ? "active-nav-btn" : ""}`}
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