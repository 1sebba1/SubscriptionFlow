"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionModal from "./SubscriptionModal";
import {
  getNextPaymentDate,
  formatDate,
  getDaysUntilPayment,
} from "@/utils/dateUtils";

interface SubscriptionListProps {
  subscriptions: Subscription[];
}

export default function SubscriptionList({
  subscriptions,
}: SubscriptionListProps) {
  const [editingSubscription, setEditingSubscription] =
    useState<Subscription | null>(null);

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {subscriptions.map((subscription) => {
          const nextPayment = getNextPaymentDate(
            subscription.firstPaymentDate,
            subscription.frequency,
          );
          const daysUntil = getDaysUntilPayment(nextPayment);

          return (
            <div
              key={subscription.id}
              onClick={() => setEditingSubscription(subscription)}
              className="flex w-full cursor-pointer flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-700"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {subscription.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {subscription.brand}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                    £{subscription.price}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    per{" "}
                    {subscription.frequency === "yearly"
                      ? "year"
                      : subscription.frequency === "weekly"
                        ? "week"
                        : subscription.frequency === "quarterly"
                          ? "quarter"
                          : "month"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  {subscription.category}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    daysUntil <= 7
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      : daysUntil <= 14
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  }`}
                >
                  Next: {formatDate(nextPayment)} ({daysUntil}{" "}
                  {daysUntil === 1 ? "day" : "days"})
                </span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {subscription.description}
              </p>
            </div>
          );
        })}
      </div>

      <SubscriptionModal
        isOpen={!!editingSubscription}
        onClose={() => setEditingSubscription(null)}
        subscription={editingSubscription}
      />
    </>
  );
}
