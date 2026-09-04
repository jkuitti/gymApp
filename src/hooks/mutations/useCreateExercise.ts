import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExercise } from "../../api/exercisesApi";

export const useCreateExercise = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createExercise,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
