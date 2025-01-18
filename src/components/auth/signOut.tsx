"use client";
import React from "react";
import { Button } from "../ui/button";
import { logOut } from "@/server/auth";
type Props = {
  children: React.ReactNode;
};

const SignOutButton = ({ children }: Props) => {
  return (
    <Button
      variant="link"
      className="border-none hover:border-none"
      onClick={() => {
        logOut("/");
      }}
    >
      {children}
    </Button>
  );
};

export default SignOutButton;
