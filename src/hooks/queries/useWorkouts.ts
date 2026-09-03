import { useQuery } from "@tanstack/react-query";
import { getWorkouts } from "../../api/workoutsApi";
import type { Workout } from "../../types/workout";

export const useWorkouts = () => {
  return useQuery<Workout[]>({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });
};
