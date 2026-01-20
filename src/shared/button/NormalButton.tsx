interface NormalButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

function NormalButton({
  text,
  onClick,
  className,
  disabled = false,
}: NormalButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        font-bold py-1 px-2 rounded-lg
        transition
        ${
          disabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-light hover:text-gray-400'
        }
        ${className}
      `}
    >
      {text}
    </button>
  );
}

export default NormalButton;
