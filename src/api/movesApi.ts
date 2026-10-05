import { supabase } from "../lib/supabase";
import type { Move, NewMove } from "../types/move";

const getAllMoves = async (): Promise<Move[]> => {
  const { data, error } = await supabase.from("moves").select("*");

  if (error) {
    throw error;
  }

  return data ?? [];
};

const getMovesByExerciseId = async (exercise_id: number): Promise<Move[]> => {
  const { data, error } = await supabase
    .from("moves")
    .select("*")
    .eq("exercise_id", exercise_id)
    .eq("is_active", true)
    .order("move_number", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

const addMove = async (newMove: NewMove): Promise<void> => {
  const { error } = await supabase.from("moves").insert(newMove);

  if (error) {
    throw error;
  }
};

export { getAllMoves, getMovesByExerciseId, addMove };
