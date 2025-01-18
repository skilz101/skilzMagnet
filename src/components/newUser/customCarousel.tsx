"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  firstName: z.string({ message: "You need to write your first name" }),
  lastName: z.string({ message: "You need to write your last name" }),
  companyName: z.string({
    message: "You can your social media handle if you don't have a company",
  }),
  discover: z.string({ message: "This is required" }),
});

export function OnboardingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      discover: "",
    },
  });
}
