"use client";

import { Template } from "@prisma/client";
import { Button } from "../ui/button";
import { Loader2, ZapIcon } from "lucide-react";
import { useState } from "react";
import { generateLink } from "@/server/admin/generateLink";

interface LinkInterface {
  hasTemplate: boolean;
  id: string;
}

export function GenerateLink({ hasTemplate, id }: LinkInterface) {
  const [loading, isLoading] = useState<boolean>(false);

  let link;
  const onSubmit = async () => {
    isLoading(true);
    try {
      link = await generateLink(id);
    } catch (error) {
      console.error(error);
      isLoading(false);
    }
  };
  return (
    <div className="flex space-y-5 flex-col">
      <h2 className="text-4xl font-bold">Activate your Form</h2>
      {hasTemplate === false ? (
        <p className="text-muted-foreground">
          You haven't created a form template yet thus you will not be able to
          generate a registration link for your customers. Go to{" "}
          <code className="bg-slate-600 p-2 rounded-xl text-white">
            /editor
          </code>{" "}
          to create a page your customers will use to sign Up
        </p>
      ) : (
        <p className="text-muted-foreground">
          You can now share your form to your customers. When they fill the form
          you will recieve their details in{" "}
          <code className="bg-slate-600 p-2 rounded-xl text-white">/leads</code>{" "}
        </p>
      )}
      <Button
        disabled={!hasTemplate}
        className="w-full bg-blue-600 text-white hover:bg-blue-500"
        onClick={() => onSubmit()}
      >
        <ZapIcon />
        Activate
        {loading && <Loader2 className="animate-spin" />}
      </Button>
    </div>
  );
}
