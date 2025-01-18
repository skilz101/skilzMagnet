"use client";

import { Logo2 } from "../assets/logo";

export default function Slider() {
  return (
    <main className="grid md:grid-cols-2 gap-10 h-screen auto-rows-fr w-full">
      <div className="bg-blue-600 p-10 text-white hidden md:flex flex-col ">
        <Logo2 />

        <div className="w-full h-full flex items-center">
          <div className="flex flex-col space-y-5">
            <h2 className="text-4xl capitalize">Welcome to SkilzMagnet</h2>
            <p className="text-white/65">
              You're just a few steps away from completing your setup! Answer
              the questions below to finalize your registration and get started.
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center"></div>
    </main>
  );
}
