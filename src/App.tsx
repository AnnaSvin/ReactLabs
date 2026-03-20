import { Navigate, Route, Routes } from "react-router-dom";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/guest/settings" replace />} />
      <Route path="/:userId/settings" element={<StartPage />} />
      <Route path="/:userId/game" element={<GamePage />} />
    </Routes>
  );
}

export default App;