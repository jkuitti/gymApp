import { useMutation, useQueryClient } from "@tanstack/react-query";
import { finishWorkout } from "../../api/workoutsApi";

export const useFinishWorkout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: finishWorkout,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });
};
