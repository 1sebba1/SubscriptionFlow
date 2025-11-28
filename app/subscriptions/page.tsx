import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import SubscriptionList from "@/components/SubscriptionList";
import AddSubscriptionButton from "@/components/AddSubscriptionButton";

export default async function SubscriptionsPage() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching subscriptions:", error);
  }

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-start gap-12 overflow-hidden bg-gray-50 px-6 py-12 dark:bg-gray-900">
      {/* Header */}
      <div className="flex w-full max-w-7xl items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">
            Subscription Management
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            View and manage all your subscriptions
          </p>
        </div>
        <div className="flex items-center gap-4">
          <AddSubscriptionButton />
        </div>
      </div>

      {/* Subscription List */}
      <div className="w-full max-w-7xl">
        <SubscriptionList subscriptions={subscriptions || []} />
      </div>
    </main>
  );
}
