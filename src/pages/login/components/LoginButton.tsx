interface LoginButtonProps {
  disabled: boolean;
}

const LoginButton = ({ disabled }: LoginButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={[
        'w-full rounded-sm py-1 font-bold transition-colors mt-10',
        disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-primary hover:bg-primary-light text-white cursor-pointer',
      ].join(' ')}
    >
      Login
    </button>
  );
};

export default LoginButton;
