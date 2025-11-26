"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { BillingFrequency } from "@/types/subscription";

type ActionState = {
  message: string;
  success?: boolean;
};

export async function addSubscription(
  prevState: ActionState,
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = await createClient(cookieStore);

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const price = formData.get("price") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const frequency = formData.get("frequency") as BillingFrequency;

  if (!name || !brand || !price || !category || !frequency) {
    return { message: "Please fill in all required fields." };
  }

  const { error } = await supabase.from("subscriptions").insert({
    name,
    brand,
    price,
    category,
    description,
    frequency,
  });

  if (error) {
    console.error("Error inserting subscription:", error);
    return { message: "Failed to add subscription." };
  }

  revalidatePath("/");
  return { message: "Subscription added successfully!", success: true };
}
