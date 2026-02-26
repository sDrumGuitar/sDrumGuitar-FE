import { create } from 'zustand';
import dayjs from 'dayjs';

interface ScheduleCalendarState {
  currentYear: number;
  currentMonth: number;
  setPrevMonth: () => void;
  setNextMonth: () => void;
  setToday: () => void;
}

export const useScheduleCalendarStore = create<ScheduleCalendarState>(
  (set) => ({
    currentYear: dayjs().year(),
    currentMonth: dayjs().month(),
    setPrevMonth: () =>
      set((state) => {
        if (state.currentMonth === 0) {
          return {
            currentMonth: 11,
            currentYear: state.currentYear - 1,
          };
        }
        return {
          currentMonth: state.currentMonth - 1,
        };
      }),
    setNextMonth: () =>
      set((state) => {
        if (state.currentMonth === 11) {
          return {
            currentMonth: 0,
            currentYear: state.currentYear + 1,
          };
        }
        return {
          currentMonth: state.currentMonth + 1,
        };
      }),
    setToday: () =>
      set({
        currentMonth: dayjs().month(),
        currentYear: dayjs().year(),
      }),
  }),
);
