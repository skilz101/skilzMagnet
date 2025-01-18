"use server";

import Slider from "@/components/newUser/slider";
import { Metadata } from "next";

export async function metadata(): Promise<Metadata> {
  return {
    title: "onboarding | SkilzMagnet",
  };
}

// mock id
const id = "23643853487";

export default async function NewUser() {
  return (
    <main className="w-full">
      <Slider id={id} />
    </main>
  );
}
