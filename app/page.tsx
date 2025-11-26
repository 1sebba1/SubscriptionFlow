import { DarkThemeToggle } from "flowbite-react";
import Image from "next/image";
import AddSubscriptionButton from "@/components/AddSubscriptionButton";
import AnalyticsCards from "@/components/AnalyticsCards";
import SubscriptionList from "@/components/SubscriptionList";
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
          <SubscriptionList subscriptions={subscriptions} />
        </div>
      </div>
    </main>
  );
}
