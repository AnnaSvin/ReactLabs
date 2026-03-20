import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GameSettingsProvider } from "./context/GameSettingsContext";
import { GameSessionProvider } from "./context/GameSessionContext";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GameSettingsProvider>
        <GameSessionProvider>
          <App />
        </GameSessionProvider>
      </GameSettingsProvider>
    </BrowserRouter>
  </StrictMode>
);