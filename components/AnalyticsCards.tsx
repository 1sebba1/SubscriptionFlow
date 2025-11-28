"use client";

import { Subscription } from "@/types/subscription";
import { useCurrency } from "@/context/CurrencyContext";

interface AnalyticsCardsProps {
  subscriptions: Subscription[];
}

export default function AnalyticsCards({ subscriptions }: AnalyticsCardsProps) {
  const { symbol } = useCurrency();

  // Calculate analytics
  const totalSubscriptions = subscriptions.length;

  // Convert all subscriptions to monthly cost for calculations
  const monthlyTotal = subscriptions.reduce((total, sub) => {
    const price = parseFloat(sub.price);
    let monthlyCost = 0;

    switch (sub.frequency) {
      case "monthly":
        monthlyCost = price;
        break;
      case "yearly":
        monthlyCost = price / 12;
        break;
      case "weekly":
        monthlyCost = price * 4.33; // Average weeks per month
        break;
      case "quarterly":
        monthlyCost = price / 3;
        break;
    }

    return total + monthlyCost;
  }, 0);

  const dailyCost = monthlyTotal / 30;
  const weeklyCost = monthlyTotal / 4.33;
  const yearlyCost = monthlyTotal * 12;

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-4">
      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Total Subscriptions
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {totalSubscriptions}
        </span>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Per Day
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {symbol}
          {dailyCost.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Per Week
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {symbol}
          {weeklyCost.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Per Month
        </span>
        <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          {symbol}
          {monthlyTotal.toFixed(2)}
        </span>
      </div>

      <div className="col-span-2 flex flex-col gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 shadow-sm md:col-span-4 dark:border-blue-800 dark:bg-blue-900/20">
        <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
          Per Year
        </span>
        <span className="text-3xl font-bold text-blue-900 dark:text-blue-300">
          {symbol}
          {yearlyCost.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
