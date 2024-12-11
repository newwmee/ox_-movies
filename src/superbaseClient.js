import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_ACCESS_TOKEN;
const supabaseAPIKey = import.meta.env.VITE_SUPABASE_API_KEY;

if (!supabaseUrl || !supabaseAPIKey) {
  console.error("Missing Supabase URL or APi Key");
}

export const supabase = createClient(supabaseUrl, supabaseAPIKey);
