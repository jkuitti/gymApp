import { create } from "zustand";
import type { Move } from "../types/move";

type WorkoutStore = {
  moves: Move[];
  currentMoveIndex: number;
  currentSetNumber: number;
  setMoves: (moves: Move[]) => void;
  nextMove: () => void;
  nextSet: () => void;
  resetSet: () => void;
  previousMove: () => void;
  resetWorkout: () => void;
  setMoveindex: (index: number) => void;
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  moves: [],
  currentMoveIndex: 0,
  currentSetNumber: 1,
  setMoves: (moves) =>
    set({
      moves,
      currentMoveIndex: 0,
    }),
  nextSet: () =>
    set((state) => ({
      currentSetNumber: state.currentSetNumber + 1,
    })),
  resetSet: () =>
    set((state) => ({
      currentSetNumber: 1,
    })),

  nextMove: () =>
    set((state) => ({
      currentMoveIndex: state.currentMoveIndex + 1,
    })),

  previousMove: () =>
    set((state) => ({
      currentMoveIndex: Math.max(0, state.currentMoveIndex - 1),
    })),

  resetWorkout: () =>
    set({
      moves: [],
      currentMoveIndex: 0,
      currentSetNumber: 1,
    }),

  setMoveindex: (index: number) => set(() => ({ currentMoveIndex: index })),
}));
