"use client";

import { useState } from "react";
import { Subscription } from "@/types/subscription";
import SubscriptionModal from "./SubscriptionModal";
import EmptyState from "./EmptyState";
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

  if (subscriptions.length === 0) {
    return (
      <>
        <EmptyState />
        <SubscriptionModal
          isOpen={!!editingSubscription}
          onClose={() => setEditingSubscription(null)}
          subscription={editingSubscription}
        />
      </>
    );
  }

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-4">
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
              className="flex w-full cursor-pointer flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm transition-colors hover:bg-gray-100 md:flex-row md:items-center md:justify-between dark:border-gray-700 dark:bg-gray-800 hover:dark:bg-gray-700"
            >
              {/* Left Section: Basic Info */}
              <div className="flex flex-1 flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {subscription.name}
                  </h2>
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {subscription.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {subscription.brand}
                </p>
                {subscription.description && (
                  <p className="line-clamp-1 text-sm text-gray-600 dark:text-gray-300">
                    {subscription.description}
                  </p>
                )}
              </div>

              {/* Right Section: Status & Price */}
              <div className="mt-2 flex flex-row items-center justify-between gap-6 md:mt-0 md:justify-end">
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

                <div className="flex min-w-[80px] flex-col items-end">
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
