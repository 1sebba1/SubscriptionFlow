/**
 * Billing frequency options for subscriptions
 */
export type BillingFrequency = "monthly" | "yearly" | "weekly" | "quarterly";

/**
 * Subscription model representing a recurring service subscription
 */
export interface Subscription {
  /** Unique identifier for the subscription */
  id: number;

  /** Name of the subscription service */
  name: string;

  /** Brand or company name */
  brand: string;

  /** Price in USD (as string for display purposes) */
  price: string;

  /** Billing frequency (monthly, yearly, weekly, quarterly) */
  frequency: BillingFrequency;

  /** Category of the subscription service */
  category: string;

  /** Brief description of the subscription service */
  description: string;
}

/**
 * Form data for creating or editing a subscription
 * Omits the id field as it's auto-generated
 */
export type SubscriptionFormData = Omit<Subscription, "id">;

/**
 * Partial subscription data for updates
 */
export type SubscriptionUpdate = Partial<Omit<Subscription, "id">> & {
  id: number;
};
