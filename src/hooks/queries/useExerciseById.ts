import { useQuery } from "@tanstack/react-query";
import type { Exercise } from "../../types/exercise";
import { getExerciseById } from "../../api/exercisesApi";

export const useExerciseByID = (exerciseid: number) => {
  return useQuery<Exercise>({
    queryKey: ["exercises", exerciseid],
    queryFn: () => getExerciseById(exerciseid),
  });
};
