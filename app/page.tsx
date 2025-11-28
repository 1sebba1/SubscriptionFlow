import Image from "next/image";
import AnalyticsCards from "@/components/AnalyticsCards";
import SubscriptionList from "@/components/SubscriptionList";
import { Subscription } from "@/types/subscription";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import HeaderRow from "@/components/HeaderRow";
import { StaggerContainer, StaggerItem } from "@/components/AnimationWrapper";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const { data } = await supabase.from("subscriptions").select("*");
  const subscriptions: Subscription[] = data || [];

  return (
    <main className="flex min-h-screen flex-col items-center justify-start overflow-x-hidden bg-white px-4 py-24 dark:bg-gray-900">
      <div className="absolute inset-0 size-full overflow-hidden">
        <div className="relative h-full w-full select-none">
          <Image
            className="absolute right-0 w-auto dark:hidden"
            alt="Pattern Light"
            src="/pattern-light.svg"
            width="803"
            height="774"
          />
          <Image
            className="absolute right-0 hidden w-auto dark:block"
            alt="Pattern Dark"
            src="/pattern-dark.svg"
            width="803"
            height="775"
          />
        </div>
      </div>

      <StaggerContainer className="relative flex w-full max-w-7xl flex-col items-start justify-center gap-12">
        <StaggerItem className="w-full">
          <HeaderRow />
        </StaggerItem>

        <StaggerItem className="w-full">
          <AnalyticsCards subscriptions={subscriptions} />
        </StaggerItem>

        <StaggerItem className="w-full">
          <hr className="h-px w-[50%] justify-center self-center border-0 bg-gray-200 px-12" />
        </StaggerItem>

        <StaggerItem className="w-full">
          <div className="relative flex w-full flex-col items-start gap-6 self-stretch">
            <SubscriptionList subscriptions={subscriptions} />
          </div>
        </StaggerItem>
      </StaggerContainer>
    </main>
  );
}
