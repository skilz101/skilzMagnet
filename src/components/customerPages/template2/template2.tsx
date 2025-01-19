"use client";

import { Theme } from "@prisma/client";
import Image from "next/image";
import FormTemplate from "../formTemplate";
import { templateInterface } from "../template1/template1";

export default function Template2({
  theme,
  id,
  title,
  subTitle,
  name,
  email,
  phoneNumber,
  logo,
  companyName,
}: templateInterface) {
  return (
    <main
      className={`grid auto-rows-fr w-full gap-5 md:[grid-template-columns:0.6fr_1fr]
        ${theme === "Dark" ? "bg-zinc-900 text-white" : "bg-white text-black"}
    `}
    >
      <div className="p-2 relative">
        <div className="rounded-tl-[3rem] rounded-br-[3rem] overflow-hidden relative w-full h-full">
          <Image
            alt="skilzMagnet landing page image"
            src="/testimonial-2.jpg"
            fill
            className="rounded-tl-3xl rounded-br-3xl object-cover"
          />
        </div>
        <Image
          src={"/logo2.png"}
          alt="skilz magnet. a saas for lead generation"
          width={50}
          height={50}
          className="absolute top-10 left-10"
        />

        <p className="text-black/60 text-xl absolute bottom-10 left-[50%] -translate-x-[50%]">
          powered by SkilzMagnet
        </p>
      </div>
      <div className="flex items-center p-5 justify-center">
        <div className="flex space-y-3 flex-col">
          <div className="flex space-x-3 items-center">
            <Image
              // src={logo || ""}
              src={"/Group-7.png"}
              alt="skilz magnet. a saas for lead generation"
              width={50}
              height={50}
            />
            <p className="text-xl capitalize">{companyName}</p>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl">{title}</h1>
            <p
              className={`text-lg
                ${theme === "Dark" ? "text-white/70" : "text-muted-foreground"}
                `}
            >
              {subTitle}
            </p>
          </div>
          <FormTemplate
            name={name}
            email={email}
            phoneNumber={phoneNumber}
            id={id}
          />
        </div>
      </div>
    </main>
  );
}
