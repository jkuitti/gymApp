import { useQuery } from "@tanstack/react-query";
import type { Move } from "../../types/move";
import { getMovesByExerciseId } from "../../api/movesApi";

export const useMovesByExercise = (exerciseid: number) => {
  return useQuery<Move[]>({
    queryKey: ["moves", exerciseid],
    queryFn: () => getMovesByExerciseId(exerciseid),
  });
};
