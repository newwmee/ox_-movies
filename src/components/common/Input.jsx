import React from "react";
import PropTypes from "prop-types";
import "./Input.css"; // Input 컴포넌트의 스타일

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        type={type}
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
