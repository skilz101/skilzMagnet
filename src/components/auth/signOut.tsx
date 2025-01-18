"use client";
import React from "react";
import { Button } from "../ui/button";
import { logOut } from "@/server/auth";
import { useLocale } from "next-intl";
type Props = {
  children: React.ReactNode;
};

const SignOutButton = ({ children }: Props) => {
  const localActive = useLocale();
  return (
    <Button
      variant="link"
      className="border-none hover:border-none"
      onClick={() => {
        logOut(localActive);
      }}
    >
      {children}
    </Button>
  );
};

export default SignOutButton;
