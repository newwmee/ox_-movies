import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import "./Login.css";
import { createClient } from "@supabase/supabase-js";
import KAKAOBUTTON from "../assets/kakaotalk_sharing_btn_small.png";

// Context 및 Provider 설정
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Supabase 클라이언트 설정
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

const Login = () => {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await login(formData);
      if (!result.error) {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
      console.error("로그인 오류:", error);
    }
  };

  const handleKakaoLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "kakao",
        options: {
          redirectTo: import.meta.env.VITE_KAKAO_REDIRECT_URI,
          queryParams: {
            client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          profileImageUrl: data.user.user_metadata?.avatar_url,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("카카오 로그인 실패:", error);
      setError("카카오 로그인에 실패했습니다.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="이메일"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit">로그인</button>

        <div className="kakaosmallbutton">
          소셜로그인
          <img
            src={KAKAOBUTTON}
            alt="카카오로그인"
            onClick={handleKakaoLogin}
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
