import { useQuery } from "@tanstack/react-query";
import { getPreviousWorkoutMoveInfo } from "../../api/setsApi";
import type { FullSetDetails } from "../../types/Set";

export const usePreviousInfo = (moveName: string) => {
  return useQuery<FullSetDetails[]>({
    queryKey: ["sets", moveName],
    queryFn: () => getPreviousWorkoutMoveInfo(moveName),
    enabled: !!moveName,
  });
};
