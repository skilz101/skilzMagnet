"use client";

import * as z from "zod";
import { useForm, Resolver } from "react-hook-form";
import { Template, Theme } from "@prisma/client";
import { useState } from "react";

const formSchema = z.object({
  template: z.nativeEnum(Template),
  theme: z.nativeEnum(Theme),
  logo: z.string(),
  title: z.string(),
  subTitle: z.string(),
});

export default function PageEditor() {
  const [template, setTemplate] = useState<Template>("Template1");
  const [theme, setTheme] = useState<Theme>("Dark");
  const [logo, setLogo] = useState<string>("");
  const [title, seTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  return <main></main>;
}
