"use client";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { getGoogleOauthConsentUrl } from "@/server/auth";

export default function GoogleOAuthButton() {
  return (
    <Button
      onClick={async () => {
        const res = await getGoogleOauthConsentUrl();
        if (res.url) {
          window.location.href = res.url;
        } else {
          toast.error(res.error);
        }
      }}
      className="bg-[#4A86D4] hover:bg-[#2f6cbb] text-white"
    >
      Sign in
    </Button>
  );
}

export function GetStarted() {
  return (
    <Button
      onClick={async () => {
        const res = await getGoogleOauthConsentUrl();
        if (res.url) {
          window.location.href = res.url;
        } else {
          toast.error(res.error);
        }
      }}
      className="bg-[#4A86D4] hover:bg-[#2f6cbb] text-white w-fit h-fit px-20 py-5"
    >
      Sign in
    </Button>
  );
}
