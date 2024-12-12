import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import "./Login.css";

// 카카오 로그인 버튼 클릭 핸들러
const handleKakaoLogin = () => {
  // 카카오 SDK의 로그인 함수 호출
  if (window.Kakao) {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        // 로그인 성공 후 필요한 추가 작업 수행 (예: 토큰 서버 전송)
        navigate("/");
        window.location.reload();
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
        setError("카카오 로그인에 실패했습니다.");
      },
    });
  } else {
    console.error("Kakao SDK가 로드되지 않았습니다.");
  }
};
const Login = () => {
  const navigate = useNavigate();
  const { login } = useSupabaseAuth();
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
        window.location.reload(); // 로그인 성공 시 페이지 새로고침
      }
    } catch (error) {
      setError(error);
      console.error("로그인 오류:", error);
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

        <div className="kakao - login - container">
          <button className="kakao-login-button" onClick={handleKakaoLogin}>
            카카오로 로그인
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
