import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/guest/settings" replace />} />

      <Route path="/:userId" element={<AppLayout />}>
        <Route path="settings" element={<StartPage />} />
        <Route path="game" element={<GamePage />} />
      </Route>
    </Routes>
  );
}

export default App;