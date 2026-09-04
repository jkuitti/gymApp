import { supabase } from "../lib/supabase";
import type { NewExercise, Exercise } from "../types/exercise";

const getExercises = async (): Promise<Exercise[]> => {
  const { data, error } = await supabase.from("exercises").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
};

const createExercise = async (newExercise: NewExercise): Promise<void> => {
  const { error } = await supabase.from("exercises").insert(newExercise);

  if (error) {
    throw error;
  }
};

const getExerciseById = async (exerciseid: number) => {
  const { data, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", exerciseid)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export { getExercises, createExercise, getExerciseById };
