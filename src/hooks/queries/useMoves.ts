import { useQuery } from "@tanstack/react-query";
import { getAllMoves } from "../../api/movesApi";
import type { Move } from "../../types/move";

export const useMoves = () => {
  return useQuery<Move[]>({
    queryKey: ["moves"],
    queryFn: getAllMoves,
  });
};
