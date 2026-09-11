import { supabase } from "../lib/supabase";
import type { Workout, NewWorkout, EndWorkout } from "../types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*, exercise:exercise_id (id, name, is_active)")
    .order("started_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
};

const getLatest = async (): Promise<Workout> => {
  const { data, error } = await supabase
    .from("workouts")
    .select("*,exercise:exercise_id (id, name, is_active)")
    .order("started_at", { ascending: false })
    .limit(1)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

const createWorkout = async (newWorkout: NewWorkout): Promise<void> => {
  const { error } = await supabase.from("workouts").insert(newWorkout);

  if (error) {
    throw error;
  }
};

type FinishWorkoutVariables = {
  endWorkout: EndWorkout;
  workoutId: number;
};

const finishWorkout = async ({
  endWorkout,
  workoutId,
}: FinishWorkoutVariables): Promise<void> => {
  console.log(endWorkout);
  console.log(workoutId);
  const { error } = await supabase
    .from("workouts")
    .update({
      finished_at: endWorkout.finished_at,
      notes: endWorkout.notes,
      status: endWorkout.status,
    })
    .eq("id", workoutId);

  if (error) {
    throw error;
  }
};

export { getWorkouts, getLatest, createWorkout, finishWorkout };
