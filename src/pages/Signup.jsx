import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth } from "../hooks/useSupabaseAuth";
import Input from "../components/common/Input";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useSupabaseAuth();
  const [formData, setFormData] = useState({
    name: "", // 이름 필드 추가
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    // 이름 검사: 2~8자 사이 숫자, 한글, 영어만 사용
    const nameRegex = /^[가-힣a-zA-Z0-9]{2,8}$/;
    if (!nameRegex.test(formData.name)) {
      setError("이름은 2~8자의 한글, 영어, 숫자만 사용 가능합니다.");
      return false;
    }

    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식이 아닙니다.");
      return false;
    }

    // 비밀번호 검사: 영어 대/소문자 + 숫자 조합
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("비밀번호는 영어 대/소문자와 숫자를 포함해야 합니다.");
      return false;
    }

    // 비밀번호 확인 검사
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>회원가입</h2>
        <Input
          label="이름"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력하세요"
        />
        <Input
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력하세요"
        />
        <Input
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력하세요"
        />
        <Input
          label="비밀번호 확인"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력하세요"
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;
