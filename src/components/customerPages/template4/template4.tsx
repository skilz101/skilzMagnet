"use client";

import { Theme } from "@prisma/client";
import Image from "next/image";
import FormTemplate from "../formTemplate";
import { templateInterface } from "../template1/template1";

export default function Template4({
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
      className={`h-screen w-full md:bg-[url('/pexels-manjose-19872.jpg')] bg-cover bg-center backdrop-blur-3xl
        ${theme === "Dark" ? "text-white" : " text-black"}
    `}
    >
      <div className="w-full h-full flex items-center justify-center p-2 md:p-20 backdrop-blur-sm">
        <div
          className={`h-full grid md:grid-cols-2 shadow-xl shadow-black/20  rounded-xl w-full
            ${theme === "Dark" ? "bg-zinc-900" : "bg-white"}
          `}
        >
          <div className="flex items-center p-5 justify-center">
            <div className="flex space-y-3 text-center items-center flex-col">
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
          <div className="hidden md:block p-2 relative">
            <div className="rounded-xl overflow-hidden relative w-full h-full">
              <Image
                alt="skilzMagnet landing page image"
                src="/pexels-manjose-19872.jpg"
                fill
                className="object-cover"
              />
            </div>
            <Image
              src={"/logo2.png"}
              alt="skilz magnet. a saas for lead generation"
              width={50}
              height={50}
              className="absolute top-10 left-10"
            />

            <p className="text-white text-xl absolute bottom-10 left-[50%] -translate-x-[50%]">
              powered by SkilzMagnet
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
