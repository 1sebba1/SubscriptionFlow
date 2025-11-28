"use client";

import { DarkThemeToggle } from "flowbite-react";
import { useCurrency } from "@/context/CurrencyContext";

export default function SettingsPage() {
  const { currency, setCurrency } = useCurrency();

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start gap-12 overflow-hidden bg-gray-50 px-6 py-12 dark:bg-gray-900">
      {/* Header */}
      <div className="flex w-full max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
            Settings
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Customize your SubTracker experience
          </p>
        </div>
      </div>

      {/* Settings Content */}
      <div className="w-full max-w-7xl">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          {/* Appearance Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle between light and dark theme
                </p>
              </div>
              <DarkThemeToggle />
            </div>
          </div>

          {/* Account Section */}
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              Account
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Currency
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Select your preferred currency
                  </p>
                </div>
                <select
                  value={currency}
                  onChange={(e) =>
                    setCurrency(e.target.value as "GBP" | "USD" | "EUR")
                  }
                  className="cursor-pointer rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option value="GBP">GBP (£)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-white">
              About
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                SubTracker
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Version 1.0.0
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Track and manage all your subscriptions in one place
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
