"use server";

import Slider from "@/components/newUser/slider";
import { Metadata } from "next";

export async function metadata(): Promise<Metadata> {
  return {
    title: "onboarding | SkilzMagnet",
  };
}

export default async function NewUser() {
  return (
    <main className="w-full">
      <Slider />
    </main>
  );
}
