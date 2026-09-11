import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkout } from "../../api/workoutsApi";

export const useCreateWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWorkout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};
