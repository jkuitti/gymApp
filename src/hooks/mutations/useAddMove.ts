import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMove } from "../../api/movesApi";

export const useAddMove = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addMove,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["moves"] });
      await queryClient.invalidateQueries({ queryKey: ["exercises"] });
    },
  });
};
