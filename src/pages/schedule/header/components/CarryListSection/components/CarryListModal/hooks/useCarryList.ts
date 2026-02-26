import { useEffect, useState } from 'react';
import { getRollOverLessons, type LessonItem } from '@/shared/api/lessons';

// 이월 목록을 관리하는 커스텀 훅 - 이월된 레슨 목록을 가져오고 상태로 관리
export const useCarryList = () => {
  // 이월된 레슨 목록
  const [lessons, setLessons] = useState<LessonItem[]>([]);

  // 이월된 레슨 목록을 API에서 가져오는 함수
  const fetchLessons = async () => {
    try {
      const response = await getRollOverLessons();
      setLessons(response.lessons);
    } catch (error) {
      console.error('Failed to fetch roll-over lessons:', error);
    }
  };

  // 컴포넌트가 마운트될 때 이월된 레슨 목록을 가져옴
  useEffect(() => {
    fetchLessons();
  }, []);

  return { lessons, fetchLessons };
};
