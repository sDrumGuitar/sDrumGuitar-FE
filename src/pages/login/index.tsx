import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    alert("로그인되었습니다.");
    setErrorMessage(null);
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

const LogoName = () => {
  return (
    <p className="text-3xl font-bold text-primary text-center mb-10">
      에스드럼기타 음악교습소
    </p>
  );
};

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

const LoginButton = ({ disabled }: { disabled: boolean }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        "w-full rounded-sm py-1 font-bold transition-colors mt-10",
        disabled
          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
          : "bg-primary hover:bg-primary-light text-white cursor-pointer",
      ].join(" ")}
    >
      Login
    </button>
  );
};

export default LoginPage;
