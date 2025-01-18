"use client";

import Image from "next/image";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <main className="w-full grid py-12 md:py-24 lg:py-32 md:min-h-screen md:grid-cols-2 gap-10 auto-rows-fr">
      <div className="p-10 flex flex-col space-y-3 items-start">
        {/* badge */}
        <div className="rounded-2xl inline w-fit h-fit p-3 py-1 bg-blue-200 text-blue-600 shadow-2xl">
          #1 platform to
        </div>
        <div className="">
          <h1 className="text-4xl">
            <span className="text-blue-600">Collect</span>,{" "}
            <span className="text-blue-600">Organize</span>, <br />
            and Manage Your
            <span className="text-blue-600"> Followers</span>
          </h1>
        </div>

        <p className="text-muted-foreground text-2xl">
          Sign up below to access a powerful dashboard where you can create
          custom landing pages to collect your followers' emails and export them
          as a CSV file—effortlessly streamline your email marketing strategy
          today
        </p>

        <Button className="bg-[#4A86D4] hover:bg-[#2f6cbb] text-white w-fit h-fit px-20 py-5">
          Get Started
        </Button>
      </div>
      <div className="bg-blue-300/10 relative row-start-1 col-start-1 md:col-start-2">
        <Image
          src="/Group-2.png"
          fill
          className="object-cover md:object-fit"
          alt="social media analytics"
        />
      </div>
    </main>
  );
}
