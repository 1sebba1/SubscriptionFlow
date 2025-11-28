import { BillingFrequency } from "@/types/subscription";

/**
 * Calculate the next payment date based on the first payment date and billing frequency
 * Returns date string in YYYY-MM-DD format
 */
export function getNextPaymentDate(
  firstPaymentDate: string,
  frequency: BillingFrequency,
): string {
  const firstDate = new Date(firstPaymentDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

  // If the first payment is in the future, return it
  if (firstDate >= today) {
    return formatDateToYYYYMMDD(firstDate);
  }

  const nextDate = new Date(firstDate);

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

  return formatDateToYYYYMMDD(nextDate);
}

/**
 * Format a Date object to YYYY-MM-DD string
 */
function formatDateToYYYYMMDD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Format a date as a readable string (e.g., "Nov 25, 2025")
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get the number of days until the next payment
 */
export function getDaysUntilPayment(nextPaymentDateStr: string): number {
  const nextPaymentDate = new Date(nextPaymentDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = nextPaymentDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
