"use server";

import Slider from "@/components/newUser/slider";
import { getUser } from "@/lib/lucia";
import { Roles } from "@prisma/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function metadata(): Promise<Metadata> {
  return {
    title: "onboarding | SkilzMagnet",
  };
}

export default async function NewUser() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  if (user.role === Roles.NEWUSER) {
    return (
      <main className="w-full">
        <Slider id={user.id} />
      </main>
    );
  } else if (user.role === Roles.ADMIN) {
    redirect("/admin");
  } else {
    redirect("/");
  }
}
