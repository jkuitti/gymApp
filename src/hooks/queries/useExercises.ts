import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../../api/exercisesApi";
import type { Exercise } from "../../types/exercise";

export const useExercises = () => {
  return useQuery<Exercise[]>({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });
};
