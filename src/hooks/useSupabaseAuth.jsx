import { useState, useEffect } from "react";
import { useSupabase } from "../superbaseClient.jsx";

const DTO_TYPE = {
  error: "error",
  user: "user",
};

const dto = ({ type, rawData }) => {
  switch (type) {
    case DTO_TYPE.user:
      const { user_metadata: userInfo } = rawData?.data.user;
      return {
        user: {
          id: userInfo.sub,
          email: userInfo.email,
          userName: userInfo.userName,
          profileImageUrl: userInfo.profileImageUrl,
        },
      };
    case DTO_TYPE.error:
      const { error: rawError } = rawData;
      return {
        error: {
          status: rawError.status,
          message: rawError.message,
        },
      };
    default:
      throw new Error("wrong type accessed");
  }
};

export const useSupabaseAuth = () => {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription?.unsubscribe();
  }, [supabase]);

  const login = async ({ email, password }) => {
    const data = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return dto({
      type: !data.error ? DTO_TYPE.user : DTO_TYPE.error,
      rawData: data,
    });
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
      setUser(null);
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error("로그아웃 에러:", error);
    }
  };

  return {
    user,
    login,
    logout,
  };
};
