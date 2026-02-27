import { IoReload } from 'react-icons/io5';

interface NormalButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

function NormalButton({
  text,
  onClick,
  className,
  disabled = false,
  isLoading = false,
}: NormalButtonProps) {
  const isInteractionDisabled = disabled || isLoading;

  return (
    <button
      disabled={isInteractionDisabled}
      onClick={onClick}
      className={`
        font-bold py-1 px-2 rounded-lg flex items-center justify-center gap-2
        transition ${isInteractionDisabled ? '' : 'pressable'}
        ${
          isInteractionDisabled
            ? 'bg-gray-400 text-white cursor-not-allowed'
            : 'bg-primary text-white hover:bg-primary-light hover:text-gray-400'
        }
        ${className}
      `}
    >
      {isLoading && <IoReload className="animate-spin" />}
      {text}
    </button>
  );
}

export default NormalButton;
