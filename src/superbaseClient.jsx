import { createClient } from "@supabase/supabase-js";
import { createContext, useContext } from "react";

const supabaseEnv = {
  apiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  projectURL: import.meta.env.VITE_SUPABASE_PROJECT_URL,
};

export const supabaseClient = createClient(
  supabaseEnv.projectURL,
  supabaseEnv.apiKey
);

const SUPABASE = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return (
    <SUPABASE.Provider value={supabaseClient}>{children}</SUPABASE.Provider>
  );
};

export const useSupabase = () => {
  const supabase = useContext(SUPABASE);
  if (!supabase) {
    throw new Error("supabase가 초기화 되지 않았습니다.");
  }
  return supabase;
};

// DTO 관련 코드는 여기에 그대로 유지
