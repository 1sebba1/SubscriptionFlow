"use client";

import { Subscription } from "@/types/subscription";
import { useState } from "react";
import { getNextPaymentDate } from "@/utils/dateUtils";
import { motion } from "motion/react";
import { useCurrency } from "@/context/CurrencyContext";

interface CalendarViewProps {
  subscriptions: Subscription[];
}

export default function CalendarView({ subscriptions }: CalendarViewProps) {
  const { symbol } = useCurrency();
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Create array of days
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Get payments for each day
  const getPaymentsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return subscriptions.filter((sub) => {
      const nextPayment = getNextPaymentDate(
        sub.first_payment_date,
        sub.frequency,
      );
      return nextPayment === dateStr;
    });
  };

  // Navigation functions
  const previousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Calendar Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex gap-2">
          <motion.button
            onClick={previousMonth}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Previous
          </motion.button>
          <motion.button
            onClick={goToToday}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Today
          </motion.button>
          <motion.button
            onClick={nextMonth}
            className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </div>
      </div>

      {/* Day names */}
      <div className="mb-2 grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="py-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before month starts */}
        {emptyDays.map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days of the month */}
        {days.map((day) => {
          const payments = getPaymentsForDay(day);
          const isToday =
            day === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear();

          return (
            <motion.div
              key={day}
              className={`relative aspect-square rounded-lg border p-2 ${
                isToday
                  ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
              }`}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: day * 0.01 }}
            >
              <div className="flex h-full flex-col">
                <span
                  className={`text-sm font-medium ${
                    isToday
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {day}
                </span>
                {payments.length > 0 && (
                  <div className="mt-1 flex-1 overflow-hidden">
                    {payments.slice(0, 2).map((payment) => (
                      <div
                        key={payment.id}
                        className="mb-1 flex items-center justify-between gap-1 truncate rounded bg-blue-100 px-1 py-0.5 text-xs dark:bg-blue-800"
                        title={`${payment.name} - ${symbol}${payment.price}`}
                      >
                        <span className="truncate text-blue-800 dark:text-blue-100">
                          {payment.name}
                        </span>
                        <span className="shrink-0 font-semibold text-blue-900 dark:text-blue-50">
                          {symbol}
                          {payment.price}
                        </span>
                      </div>
                    ))}
                    {payments.length > 2 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{payments.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-4 border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded border-2 border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Today
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded bg-blue-100 dark:bg-blue-800" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Payment due
          </span>
        </div>
      </div>
    </div>
  );
}
