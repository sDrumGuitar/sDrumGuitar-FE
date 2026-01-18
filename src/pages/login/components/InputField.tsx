import React from "react";

interface InputFieldProps {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  clearError: () => void;
}

const InputField = ({ password, setPassword, clearError }: InputFieldProps) => {
  return (
    <div className="flex gap-4 items-center">
      <label className="text-primary w-10" htmlFor="password">
        PW
      </label>
      <input
        id="password"
        type="password"
        className="border flex-1 rounded-sm text-primary border-primary pl-2 py-1"
        value={password}
        autoFocus
        placeholder="관리자 비밀번호 입력"
        onChange={(e) => {
          setPassword(e.target.value);
          clearError();
        }}
      />
    </div>
  );
};

export default InputField;
