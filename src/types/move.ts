export type Move = {
  id: number;
  name: string;
  reps: string;
  sets: number;
  exercise_id: number;
};

export type NewMove = {
  name: string;
  reps: string;
  sets: number;
  exercise_id: number;
};
