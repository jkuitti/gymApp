import { useQuery } from "@tanstack/react-query";
import type { User } from "@supabase/supabase-js";
import { getUser } from "../../api/userApi";

export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getUser,
  });
};
