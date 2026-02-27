import {
  IoCheckmarkCircle,
  IoAlertCircle,
  IoInformationCircle,
  IoWarning,
} from 'react-icons/io5';
import { type ToastType, useToastStore } from '@/store/feedback/toastStore';

interface ToastItemProps {
  id: string;
  type: ToastType;
  message: string;
}

const toastStyles = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <IoCheckmarkCircle className="text-green-500 text-xl" />,
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <IoAlertCircle className="text-red-500 text-xl" />,
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <IoInformationCircle className="text-blue-500 text-xl" />,
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: <IoWarning className="text-yellow-500 text-xl" />,
  },
};

export default function ToastItem({ id, type, message }: ToastItemProps) {
  const { removeToast } = useToastStore();
  const style = toastStyles[type];

  return (
    <div
      onClick={() => removeToast(id)}
      className={`
        flex items-center gap-3 p-4 rounded-lg border shadow-lg
        min-w-[300px] max-w-[450px] cursor-pointer animate-slide-in
        ${style.bg} ${style.border} ${style.text}
      `}
    >
      {style.icon}
      <p className="flex-1 font-medium">{message}</p>
    </div>
  );
}
