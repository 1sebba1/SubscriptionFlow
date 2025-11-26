"use client";
import { motion } from "motion/react";
import React from "react";
import AddSubscriptionButton from "./AddSubscriptionButton";

export default function HeaderRow() {
  return (
    <div className="relative flex w-full flex-row items-center justify-between gap-6 self-stretch">
      <div className="relative flex flex-col items-start gap-6">
        <motion.h1 className="relative text-start text-4xl leading-[125%] font-bold text-gray-900 dark:text-gray-200">
          Subscriptions
        </motion.h1>
        <span className="inline-flex flex-wrap items-center justify-center gap-2.5 text-start">
          <motion.span className="inline text-xl text-gray-600 dark:text-gray-400">
            Start Adding Your Subscriptions Now!
          </motion.span>
        </span>
      </div>
      <div className="self-end sm:self-auto">
        <AddSubscriptionButton />
      </div>
    </div>
  );
}
