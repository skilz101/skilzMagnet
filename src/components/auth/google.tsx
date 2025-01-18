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
      className="bg-white text-black hover:text-white"
    >
      Continue with Google!
    </Button>
  );
}
