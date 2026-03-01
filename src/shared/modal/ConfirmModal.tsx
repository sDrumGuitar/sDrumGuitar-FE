import { useEffect, useState } from 'react';
import ModalWrapper from './ModalWrapper';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

function ConfirmModal({
  isOpen,
  title = '확인',
  description,
  confirmText = '확인',
  cancelText = '취소',
  isDanger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const [canBackdropClose, setCanBackdropClose] = useState(false);

  useEffect(() => {
    setCanBackdropClose(false);
    const timer = setTimeout(() => {
      setCanBackdropClose(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleBackdropClose = () => {
    if (!canBackdropClose) return;
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <ModalWrapper onClose={handleBackdropClose} className="w-90! min-h-0! h-auto!">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-10 rounded-md border border-gray-200 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`h-10 rounded-md px-4 text-sm font-semibold text-white ${
              isDanger
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ConfirmModal;
