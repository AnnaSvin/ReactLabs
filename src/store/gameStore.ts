import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  GameResult,
  GameSettings,
  ResultRecord,
  ScoreState,
} from "../types/game.types";

interface GameStoreState {
  settings: GameSettings;
  round: number;
  score: ScoreState;
  results: ResultRecord[];
  updateSettings: (settings: GameSettings) => void;
  nextRound: () => void;
  applyResult: (result: Exclude<GameResult, null>) => void;
  rollbackResult: (result: Exclude<GameResult, null>) => void;
  resetSession: () => void;
  addResultRecord: (record: ResultRecord) => void;
  removeLastResultRecord: () => void;
  clearResults: () => void;
}

const defaultSettings: GameSettings = {
  difficulty: "easy",
  boardSize: 3,
  botMoveDelay: 700,
};

const defaultScore: ScoreState = {
  X: 0,
  O: 0,
  draws: 0,
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      round: 1,
      score: defaultScore,
      results: [],

      updateSettings: (settings) => {
        set({ settings });
      },

      nextRound: () => {
        set((state) => ({
          round: state.round + 1,
        }));
      },

      applyResult: (result) => {
        set((state) => {
          if (result === "X") {
            return {
              score: {
                ...state.score,
                X: state.score.X + 1,
              },
            };
          }

          if (result === "O") {
            return {
              score: {
                ...state.score,
                O: state.score.O + 1,
              },
            };
          }

          return {
            score: {
              ...state.score,
              draws: state.score.draws + 1,
            },
          };
        });
      },

      rollbackResult: (result) => {
        set((state) => {
          if (result === "X") {
            return {
              score: {
                ...state.score,
                X: Math.max(0, state.score.X - 1),
              },
            };
          }

          if (result === "O") {
            return {
              score: {
                ...state.score,
                O: Math.max(0, state.score.O - 1),
              },
            };
          }

          return {
            score: {
              ...state.score,
              draws: Math.max(0, state.score.draws - 1),
            },
          };
        });
      },

      resetSession: () => {
        set({
          round: 1,
          score: defaultScore,
        });
      },

      addResultRecord: (record) => {
        set((state) => ({
          results: [record, ...state.results],
        }));
      },

      removeLastResultRecord: () => {
        set((state) => ({
          results: state.results.slice(1),
        }));
      },

      clearResults: () => {
        set({ results: [] });
      },
    }),
    {
      name: "tic-tac-toe-store",
      partialize: (state) => ({
        settings: state.settings,
        results: state.results,
      }),
    }
  )
);