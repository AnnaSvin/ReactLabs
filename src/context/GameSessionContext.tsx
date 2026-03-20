import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import type { GameResult } from "../types/game.types";

interface ScoreState {
  X: number;
  O: number;
  draws: number;
}

interface GameSessionState {
  round: number;
  score: ScoreState;
}

type GameSessionAction =
  | { type: "NEXT_ROUND" }
  | { type: "APPLY_RESULT"; payload: GameResult }
  | { type: "ROLLBACK_RESULT"; payload: GameResult }
  | { type: "RESET_SESSION" };

interface GameSessionContextValue {
  state: GameSessionState;
  dispatch: React.Dispatch<GameSessionAction>;
}

const initialState: GameSessionState = {
  round: 1,
  score: {
    X: 0,
    O: 0,
    draws: 0,
  },
};

function gameSessionReducer(
  state: GameSessionState,
  action: GameSessionAction
): GameSessionState {
  switch (action.type) {
    case "NEXT_ROUND":
      return {
        ...state,
        round: state.round + 1,
      };

    case "APPLY_RESULT":
      if (action.payload === "X") {
        return {
          ...state,
          score: { ...state.score, X: state.score.X + 1 },
        };
      }

      if (action.payload === "O") {
        return {
          ...state,
          score: { ...state.score, O: state.score.O + 1 },
        };
      }

      if (action.payload === "draw") {
        return {
          ...state,
          score: { ...state.score, draws: state.score.draws + 1 },
        };
      }

      return state;

    case "ROLLBACK_RESULT":
      if (action.payload === "X") {
        return {
          ...state,
          score: { ...state.score, X: Math.max(0, state.score.X - 1) },
        };
      }

      if (action.payload === "O") {
        return {
          ...state,
          score: { ...state.score, O: Math.max(0, state.score.O - 1) },
        };
      }

      if (action.payload === "draw") {
        return {
          ...state,
          score: {
            ...state.score,
            draws: Math.max(0, state.score.draws - 1),
          },
        };
      }

      return state;

    case "RESET_SESSION":
      return initialState;

    default:
      return state;
  }
}

const GameSessionContext = createContext<GameSessionContextValue | null>(null);

interface GameSessionProviderProps {
  children: ReactNode;
}

export function GameSessionProvider({ children }: GameSessionProviderProps) {
  const [state, dispatch] = useReducer(gameSessionReducer, initialState);

  return (
    <GameSessionContext.Provider value={{ state, dispatch }}>
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession() {
  const context = useContext(GameSessionContext);

  if (!context) {
    throw new Error("useGameSession must be used inside GameSessionProvider");
  }

  return context;
}