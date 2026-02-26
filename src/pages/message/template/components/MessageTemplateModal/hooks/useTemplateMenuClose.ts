import { useMessageTemplateStore } from '@/store/messageTemplateStore';
import { useEffect } from 'react';

export const useTemplateMenuClose = () => {
  const closeMenu = useMessageTemplateStore((state) => state.closeMenu);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.closest('[data-template-menu-trigger]') ||
        target.closest('[data-template-menu-panel]')
      ) {
        return;
      }
      closeMenu();
    };

    window.addEventListener('mousedown', handleMouseDown);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [closeMenu]);
};
