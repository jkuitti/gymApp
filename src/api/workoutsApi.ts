import { supabase } from "../lib/supabase";
import type { Workout } from "../types/workout";

const getWorkouts = async (): Promise<Workout[]> => {
  const { data, error } = await supabase.from("workouts").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
};

export { getWorkouts };
