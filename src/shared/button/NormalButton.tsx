interface NormalButtonProps {
  text: string;
  onClick?: () => void;
}

function NormalButton({ text }: NormalButtonProps) {
  return (
    <button className="bg-primary text-white font-bold py-1 px-2 rounded-lg hover:bg-primary-light hover:text-gray-400">
      {text}
    </button>
  );
}

export default NormalButton;
