interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

function ModalWrapper({ children, onClose }: ModalWrapperProps) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded min-w-[320px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
