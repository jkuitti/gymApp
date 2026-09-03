import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";

const getUser = async (): Promise<User | null> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw error;
  }

  return data.user;
};

const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }
  console.log(data);
  return data.user;
};

export { getUser, login };
