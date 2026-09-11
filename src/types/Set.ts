import type { Workout } from "./workout";
import type { Move } from "./move";

export type Set = {
  id: number;
  workout_id: number;
  weight: number;
  reps: number;
  set_number: number;
  moves_id: number;
  notes: number;
};

export type NewSet = {
  workout_id: number;
  weight: number;
  reps: number;
  set_number: number;
  moves_id: number;
  notes: string;
};

export type FullSetDetails = {
  id: number;
  workout_id: number;
  weight: number;
  reps: number;
  set_number: number;
  moves_id: number;
  notes: number;
  move: Move;
  workout: Workout;
};
