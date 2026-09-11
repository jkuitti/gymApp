import { supabase } from "../lib/supabase";
import type { Set, NewSet } from "../types/Set";
import type { FullSetDetails } from "../types/Set";

const getAllSets = async (): Promise<Set[]> => {
  const { data, error } = await supabase.from("sets").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
};

const getSetsByWorkoutId = async (workout_id: number): Promise<Set[]> => {
  const { data, error } = await supabase
    .from("sets")
    .select("*")
    .eq("workout_id", workout_id);

  if (error) {
    throw error;
  }

  return data ?? [];
};

const getSetsByMovesId = async (moves_id: number): Promise<Set[]> => {
  const { data, error } = await supabase
    .from("sets")
    .select("*")
    .eq("moves_id", moves_id);

  if (error) {
    throw error;
  }
  return data ?? [];
};

const saveSet = async (newSet: NewSet) => {
  const { error } = await supabase.from("sets").insert(newSet);

  if (error) {
    throw error;
  }
};

const getFullDetails = async (workoutId: number): Promise<FullSetDetails[]> => {
  const { data, error } = await supabase
    .from("sets")
    .select(
      "*, workout:workout_id(id,started_at, finished_at, notes), move:moves_id(id,name,reps,sets)",
    )
    .eq("workout_id", workoutId);

  if (error) {
    throw error;
  }

  return data;
};

export {
  getAllSets,
  getSetsByMovesId,
  getSetsByWorkoutId,
  saveSet,
  getFullDetails,
};
