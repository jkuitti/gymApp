import { useQuery } from "@tanstack/react-query";

import type { Set } from "../../types/Set";

export const useMoves = () => {
  return useQuery<Set[]>({
    queryKey: ["sets"],
    queryFn: ,
  });
};
