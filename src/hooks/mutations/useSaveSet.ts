import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveSet } from "../../api/setsApi";

export const useSaveSet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: saveSet,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["sets"] });
    },
  });
};
