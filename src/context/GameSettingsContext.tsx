import { createContext, useContext, type ReactNode } from "react";
import type { GameSettings } from "../types/game.types";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface GameSettingsContextValue {
  settings: GameSettings;
  updateSettings: (newSettings: GameSettings) => void;
}

const defaultSettings: GameSettings = {
  difficulty: "easy",
  boardSize: 3,
  botMoveDelay: 700,
};

const GameSettingsContext = createContext<GameSettingsContextValue | null>(null);

interface GameSettingsProviderProps {
  children: ReactNode;
}

export function GameSettingsProvider({ children }: GameSettingsProviderProps) {
  const [settings, setSettings] = useLocalStorage<GameSettings>(
    "tic-tac-toe-settings",
    defaultSettings
  );

  const updateSettings = (newSettings: GameSettings) => {
    setSettings(newSettings);
  };

  return (
    <GameSettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </GameSettingsContext.Provider>
  );
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);

  if (!context) {
    throw new Error("useGameSettings must be used inside GameSettingsProvider");
  }

  return context;
}