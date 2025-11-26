"use client";

import { useEffect, useState } from "react";

export default function EmptyState() {
  const text = "No subscriptions here 😢";
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (!isTyping) return;

    const chars = Array.from(text);
    let index = 0;
    const intervalId = setInterval(() => {
      if (index >= chars.length) {
        clearInterval(intervalId);
        setIsTyping(false);
        // Dispatch event to trigger button shake
        window.dispatchEvent(new CustomEvent("typewriter-finished"));
        return;
      }

      const nextChar = chars[index];
      index++;
      setDisplayedText((prev) => prev + nextChar);
    }, 50);

    return () => clearInterval(intervalId);
  }, [isTyping]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        {displayedText}
        <span className="text-primary-600 animate-pulse">|</span>
      </h3>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        Add your first subscription to see analytics and upcoming payments.
      </p>
    </div>
  );
}
