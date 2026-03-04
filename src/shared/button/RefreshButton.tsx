import { useEffect, useRef, useState } from 'react';

interface RefreshButtonProps {
  onRefresh: () => void | Promise<unknown>;
  isRefreshingExternal?: boolean;
  cooldownSeconds?: number;
}

const DEFAULT_COOLDOWN_SECONDS = 30;

const RefreshButton = ({
  onRefresh,
  isRefreshingExternal = false,
  cooldownSeconds = DEFAULT_COOLDOWN_SECONDS,
}: RefreshButtonProps) => {
  const [isRefreshingInternal, setIsRefreshingInternal] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const cooldownTimerRef = useRef<number | null>(null);

  const isRefreshing = isRefreshingExternal || isRefreshingInternal;
  const isDisabled = isRefreshing || cooldownLeft > 0;

  useEffect(() => {
    if (cooldownLeft <= 0) {
      if (cooldownTimerRef.current !== null) {
        window.clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
      return;
    }

    if (cooldownTimerRef.current === null) {
      cooldownTimerRef.current = window.setInterval(() => {
        setCooldownLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (cooldownTimerRef.current !== null) {
        window.clearInterval(cooldownTimerRef.current);
        cooldownTimerRef.current = null;
      }
    };
  }, [cooldownLeft]);

  const handleClick = async () => {
    if (isDisabled) return;
    setIsRefreshingInternal(true);
    try {
      await onRefresh();
      setCooldownLeft(cooldownSeconds);
    } finally {
      setIsRefreshingInternal(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
        isDisabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : 'border-primary text-primary hover:bg-primary/10 active:scale-95 active:bg-primary/20'
      }`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className={isRefreshing ? 'animate-spin' : ''}
      >
        <path
          d="M16 10a6 6 0 1 1-1.76-4.24"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16 4v4h-4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      최신화
      {cooldownLeft > 0 && (
        <span className="text-[11px] text-gray-400">{cooldownLeft}s</span>
      )}
    </button>
  );
};

export default RefreshButton;
