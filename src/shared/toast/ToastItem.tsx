import { type ToastType, useToastStore } from '@/store/feedback/toastStore';
import { toastStyles } from './ToastStyle';

interface ToastItemProps {
  id: string;
  type: ToastType;
  message: string;
}

// 개별 토스트 아이템 컴포넌트
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
