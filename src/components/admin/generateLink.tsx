"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "../ui/button";

import { Copy, Loader2, ZapIcon } from "lucide-react";
import { useState } from "react";
import { generateLink } from "@/server/admin/generateLink";

interface LinkInterface {
  hasTemplate: boolean;
  id: string;
}

export function GenerateLink({ hasTemplate, id }: LinkInterface) {
  const [loading, isLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const [link, setLink] = useState<string>("");
  const onSubmit = async () => {
    isLoading(true);
    try {
      const Link = await generateLink(id);
      setLink(Link);
      console.log(link);
      setOpen(true);
      isLoading(false);
    } catch (error) {
      console.error(error);
      isLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_URL + "/" + link}`,
    );
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Copy your page link</DialogTitle>
            <DialogDescription>
              You can embed this link on your post captions or you can send it
              as a dm to your followers. when they fill out the form, you will
              recieve their details in the /leads page
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Copy your url
              </Label>
              <Input id="link" value={link} readOnly />
            </div>
            <Button onClick={handleCopy} size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
