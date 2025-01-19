"use client";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function TextContent() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-y-2 flex-col">
        <Label htmlFor="title">Title Text:</Label>
        <Input
          id="title"
          placeholder="this will be the h1 tag of your landing page"
        />
      </div>
    </div>
  );
}
