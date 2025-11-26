import { BillingFrequency } from "@/types/subscription";

/**
 * Calculate the next payment date based on the first payment date and billing frequency
 */
export function getNextPaymentDate(
  firstPaymentDate: string,
  frequency: BillingFrequency,
): Date {
  const firstDate = new Date(firstPaymentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

  // If the first payment is in the future, return it
  if (firstDate >= today) {
    return firstDate;
  }

  let nextDate = new Date(firstDate);

  // Calculate the next payment date based on frequency
  switch (frequency) {
    case "weekly":
      // Add weeks until we're past today
      while (nextDate < today) {
        nextDate.setDate(nextDate.getDate() + 7);
      }
      break;

    case "monthly":
      // Add months until we're past today
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 1);
      }
      break;

    case "quarterly":
      // Add 3 months until we're past today
      while (nextDate < today) {
        nextDate.setMonth(nextDate.getMonth() + 3);
      }
      break;

    case "yearly":
      // Add years until we're past today
      while (nextDate < today) {
        nextDate.setFullYear(nextDate.getFullYear() + 1);
      }
      break;
  }

  return nextDate;
}

/**
 * Format a date as a readable string (e.g., "Nov 25, 2025")
 */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get the number of days until the next payment
 */
export function getDaysUntilPayment(nextPaymentDate: Date): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = nextPaymentDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
