import { useQuery } from "@tanstack/react-query";
import { getFullDetails } from "../../api/setsApi";
import type { FullSetDetails } from "../../types/Set";

export const useFullWorkoutDetails = (workoutId: number) => {
  return useQuery<FullSetDetails[]>({
    queryKey: ["sets", workoutId],
    queryFn: () => getFullDetails(workoutId),
  });
};
