import type { Exercise } from "./exercise";

export type Status = "finished" | "in_progress";

export type Workout = {
  id: number;
  started_at: Date;
  finished_at: Date;
  exercise_id: number;
  user_id: string;
  notes: string;
  exercise: Exercise;
  status: Status;
};

export type NewWorkout = {
  started_at: Date;
  exercise_id: number;
  user_id: string;
};

export type EndWorkout = {
  notes: string;
  finished_at: Date;
  status: string;
};
