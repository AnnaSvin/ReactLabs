import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { GameSettingsProvider } from "./context/GameSettingsContext";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GameSettingsProvider>
        <App />
      </GameSettingsProvider>
    </BrowserRouter>
  </StrictMode>
);