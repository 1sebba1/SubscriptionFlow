import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import CalendarView from "@/components/CalendarView";

export default async function CalendarPage() {
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
            Payment Calendar
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Monthly view of all upcoming subscription payments
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="w-full max-w-7xl">
        <CalendarView subscriptions={subscriptions || []} />
      </div>
    </main>
  );
}
