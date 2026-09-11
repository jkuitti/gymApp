import { useQuery } from "@tanstack/react-query";
import { getLatest } from "../../api/workoutsApi";
import type { Workout } from "../../types/workout";

export const useLatestWorkout = () => {
  return useQuery<Workout>({
    queryKey: ["workouts", "latest"],
    queryFn: getLatest,
  });
};
