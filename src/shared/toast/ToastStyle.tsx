import {
  IoCheckmarkCircle,
  IoAlertCircle,
  IoInformationCircle,
  IoWarning,
} from 'react-icons/io5';

// 토스트 스타일 정의
export const toastStyles = {
  // 성공
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: <IoCheckmarkCircle className="text-green-500 text-xl" />,
  },
  // 에러
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: <IoAlertCircle className="text-red-500 text-xl" />,
  },
  // 정보
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: <IoInformationCircle className="text-blue-500 text-xl" />,
  },
  // 경고
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: <IoWarning className="text-yellow-500 text-xl" />,
  },
};