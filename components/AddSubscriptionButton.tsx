"use client";

import { useState, useEffect } from "react";
import SubscriptionModal from "./SubscriptionModal";
import { motion } from "motion/react";

export default function AddSubscriptionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleTypewriterFinished = () => {
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), 500); // Reset after animation
      };

      window.addEventListener("typewriter-finished", handleTypewriterFinished);
      return () =>
        window.removeEventListener(
          "typewriter-finished",
          handleTypewriterFinished,
        );
    }
  }, []);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`me-2 inline-flex cursor-pointer items-center rounded-lg bg-blue-700 px-5 py-2.5 text-start text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:text-gray-200 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          shouldShake ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg
          className="mr-2 h-6 w-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h14m-7 7V5"
          />
        </svg>
        Add Subscription
      </motion.button>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
