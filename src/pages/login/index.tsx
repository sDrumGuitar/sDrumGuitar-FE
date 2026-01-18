import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "./components/InputField";
import LoginButton from "./components/LoginButton";
import LogoName from "./components/LogoName";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const navigate = useNavigate();
  const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

  const isEnabled = password.trim().length > 0;

  const handleLogin = () => {
    if (!isEnabled) return;

    const isValid = adminPassword === password;

    if (!isValid) {
      setErrorMessage("비밀번호가 맞지 않습니다.");
      return;
    }

    setErrorMessage(null);
    alert("로그인되었습니다.");
    navigate("/home");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <LogoName />

        <InputField
          password={password}
          setPassword={setPassword}
          clearError={() => setErrorMessage(null)}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm text-right mt-2">{errorMessage}</p>
        )}

        <LoginButton disabled={!isEnabled} />
      </form>
    </div>
  );
}

export default LoginPage;
