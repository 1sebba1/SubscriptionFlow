import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import AddSubscriptionButton from "@/components/AddSubscriptionButton";
import AnalyticsCards from "@/components/AnalyticsCards";
import { Subscription } from "@/types/subscription";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data } = await supabase.from("subscriptions").select("*");
  const subscriptions: Subscription[] = data || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute inset-0 size-full">
        <div className="relative h-full w-full select-none">
          <Image
            className="absolute right-0 min-w-dvh dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width="803"
            height="774"
          />
          <Image
            className="absolute right-0 hidden min-w-dvh dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width="803"
            height="775"
          />
        </div>
      </div>
      <div className="absolute top-4 right-4">
        <DarkThemeToggle />
      </div>

      <div className="relative flex w-full max-w-5xl flex-col items-start justify-center gap-12">
        <div className="relative flex w-full flex-row items-center justify-between gap-6 self-stretch">
          <div className="relative flex flex-col items-start gap-6">
            <h1 className="relative text-center text-4xl leading-[125%] font-bold text-gray-900 dark:text-gray-200">
              Subscriptions
            </h1>
            <span className="inline-flex flex-wrap items-center justify-center gap-2.5 text-center">
              <span className="inline text-xl text-gray-600 dark:text-gray-400">
                Start Adding Your Subscriptions Now!
              </span>
            </span>
          </div>
          <AddSubscriptionButton />
        </div>

        <AnalyticsCards subscriptions={subscriptions} />

        <hr className="h-px w-[50%] justify-center self-center border-0 bg-gray-200 px-12" />

        <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            {subscriptions.map((subscription) => (
              <div
                key={subscription.id}
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
                      ${subscription.price}
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

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {subscription.category}
                  </span>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {subscription.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
