import { useToastStore } from '@/store/feedback/toastStore';
import ToastItem from './ToastItem';

export default function ToastContainer() {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}
