import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const InputField = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  isPasswordVisible,
  togglePasswordVisibility,
}) => (
  <div>
    <label className="block text-sm mb-2 font-medium">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="py-3 px-4 pr-10 block w-full border shadow-sm rounded-lg text-sm text-gray-500 focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        placeholder={placeholder}
      />
      {togglePasswordVisibility && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer text-gray-500 focus:outline-none focus:text-blue-600"
        >
          {isPasswordVisible ? (
            <FiEye className="w-5 h-5" />
          ) : (
            <FiEyeOff className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  </div>
);

export default InputField;
