"use client";

import { useActionState, useEffect } from "react";
import { addSubscription } from "@/app/actions";

interface AddSubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialState = {
  message: "",
  success: false,
};

export default function AddSubModal({ isOpen, onClose }: AddSubModalProps) {
  const [state, formAction, isPending] = useActionState(
    addSubscription,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      onClose();
    }
  }, [state.success, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="bg-opacity-50 fixed inset-0 z-40 bg-gray-900"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="false"
        className="h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-x-hidden overflow-y-auto md:inset-0 md:h-full"
      >
        <div className="relative h-full w-full max-w-2xl p-4 md:h-auto">
          <div className="relative rounded-lg bg-white p-4 shadow sm:p-5 dark:bg-gray-800">
            <div className="mb-4 flex items-center justify-between rounded-t border-b pb-4 sm:mb-5 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add Subscription
              </h3>
              <button
                type="button"
                onClick={onClose}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form action={formAction}>
              <div className="mb-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Netflix"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    id="brand"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Netflix Inc."
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="price"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    id="price"
                    className="focus:ring-primary-600 focus:border-primary-600 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="9.99"
                    required={true}
                  />
                </div>
                <div>
                  <label
                    htmlFor="frequency"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    name="frequency"
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    required
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="weekly">Weekly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    required
                  >
                    <option value="">Select category</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Music">Music</option>
                    <option value="Software">Software</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Write subscription description here"
                  ></textarea>
                </div>
              </div>
              {state.message && !state.success && (
                <div className="mb-4 text-sm text-red-600 dark:text-red-400">
                  {state.message}
                </div>
              )}
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:ring-4 focus:outline-none disabled:opacity-50"
              >
                <svg
                  className="mr-1 -ml-1 h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {isPending ? "Adding..." : "Add new subscription"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
