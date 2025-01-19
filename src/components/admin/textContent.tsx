"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface TextInterface {
  title: string;
  subTitle: string;
  handleTitleChange: (newTitle: string) => void;
  handleSubTitlechange: (newSubTitle: string) => void;
}
export default function TextContent({
  title,
  subTitle,
  handleTitleChange,
  handleSubTitlechange,
}: TextInterface) {
  const [modifiedtitle, setTitle] = useState<string>(title);
  const [modifiedsubtitle, setSubTitle] = useState<string>(subTitle);

  const onTitleChange = (selectedTitle: string) => {
    handleTitleChange(selectedTitle);
    setTitle(selectedTitle);
  };

  const onSubTitleChange = (selectedTitle: string) => {
    handleSubTitlechange(selectedTitle);
    setSubTitle(selectedTitle);
  };
  return (
    <div className="flex flex-col space-y-3">
      <div className="flex space-y-2 flex-col">
        <Label htmlFor="title" className="text-xl">
          Title Text:
        </Label>
        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-2 items-end justify-end">
            <Input
              id="title"
              placeholder="this will be the h1 tag of your landing page"
              onChangeCapture={(e) =>
                onTitleChange((e.target as HTMLInputElement).value)
              }
            />
            <div className="flex items-center space-x-2">
              <span
                className={`${
                  title?.length > 60 ? "text-red-600" : "text-muted-foreground"
                }`}
              >
                {title?.length}
              </span>
              /60
            </div>
          </div>
          {title?.length > 60 && (
            <p className="text-red-600">
              You can only write a maximum of 60 characters for your title
            </p>
          )}
        </div>
      </div>

      <div className="flex space-y-2 flex-col">
        <Label htmlFor="sub-title" className="text-xl">
          Sub Title Text:
        </Label>

        <div className="flex flex-col space-y-1">
          <div className="flex flex-col space-y-2 items-end justify-end">
            <Textarea
              id="sub-title"
              placeholder="this will be the h1 tag of your landing page"
              onChangeCapture={(e) =>
                onSubTitleChange((e.target as HTMLInputElement).value)
              }
            />

            <div className="flex items-center space-x-2">
              <span
                className={`${
                  subTitle?.length > 160
                    ? "text-red-600"
                    : "text-muted-foreground"
                }`}
              >
                {subTitle?.length}
              </span>
              /160
            </div>
          </div>
          {subTitle?.length > 60 && (
            <p className="text-red-600">
              You can only write a maximum of 160 characters for your sub title
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
