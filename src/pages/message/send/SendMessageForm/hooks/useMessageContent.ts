import { useState } from 'react';

export const useMessageContent = () => {
  const [content, setContent] = useState('');
  const isContentValid = content.trim().length > 0;

  return {
    content,
    setContent,
    isContentValid,
  };
};
