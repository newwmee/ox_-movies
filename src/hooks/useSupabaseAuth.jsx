import { useState, useEffect } from "react";
import { useSupabase } from "../superbaseClient.jsx";
import { useUser } from "../pages/Login";

export const useSupabaseAuth = () => {
  const supabase = useSupabase();
  const [user, setUser] = useState(null);
  const { setUser: setContextUser } = useUser();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const userData = session.user;
        setUser(userData);
        setContextUser({
          id: userData.id,
          email: userData.email,
          profileImageUrl: userData.user_metadata?.avatar_url,
        });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        const userData = session.user;
        setUser(userData);
        setContextUser({
          id: userData.id,
          email: userData.email,
          profileImageUrl: userData.user_metadata?.avatar_url,
        });
      } else {
        setUser(null);
        setContextUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [supabase, setContextUser]);

  const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    const userData = {
      id: data.user.id,
      email: data.user.email,
      profileImageUrl: data.user.user_metadata?.avatar_url,
    };

    setContextUser(userData);
    return { user: userData };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setContextUser(null);
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
