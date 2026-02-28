interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
  className?: string;
}

function ModalWrapper({ children, onClose, className }: ModalWrapperProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className={`bg-white p-6 rounded w-200 min-h-150 ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
