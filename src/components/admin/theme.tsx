"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Theme } from "@prisma/client";

// logoImports

import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";

interface ThemeInterface {
  theme: Theme | undefined;
  onThemeChange: (selectedTheme: Theme) => void;
}
export default function ThemeSelector({
  theme,
  onThemeChange,
}: ThemeInterface) {
  const [activeTheme, setActiveTheme] = useState<Theme | undefined>(theme);

  const handleThemeChange = (selectedTheme: Theme) => {
    onThemeChange(selectedTheme);
    setActiveTheme(selectedTheme);
  };

  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl">Select Theme</h3>
      <div className="flex space-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleThemeChange("Light")}
                className={`w-8 h-8 rounded-full p-0 flex justify-center items-center text-blue-600 hover:text-white hover:bg-blue-600 bg-blue-200
                    ${activeTheme === "Light" && "text-white bg-blue-600"}
                    `}
              >
                <Sun />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Light Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => handleThemeChange("Dark")}
                className={`w-8 h-8 rounded-full p-0 flex justify-center items-center text-black hover:text-white bg-zinc-400
                    ${activeTheme === "Dark" && "bg-primary text-white"}
                    `}
              >
                <Moon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Dark Theme</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

interface LogoUploadInterface {
  logo: string;
  onLogoChange: (selectedLogo: string) => void;
}
export function LogoUpload({ logo, onLogoChange }: LogoUploadInterface) {
  const [activeLogo, setActiveLogo] = useState<string | undefined>(logo);

  const handleLogoChange = (selectedLogo: string) => {
    setActiveLogo(selectedLogo);
    onLogoChange(selectedLogo);
  };

  useEffect(() => {
    setActiveLogo(logo);
  }, [logo]);

  return (
    <div className="flex flex-col space-y-3">
      <h3 className="text-xl">Upload Logo</h3>
      <div className="flex space-x-5 items-center">
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            // Do something with the response
            console.log("Files: ", res);
            handleLogoChange(res[0].url as string);
            alert("Upload Completed");
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
          appearance={{
            container: {
              display: "inline",
              margin: "none",
            },
            allowedContent: {
              display: "none",
            },
          }}
          content={{
            button({ ready }) {
              if (ready) return <p>Upload</p>;
            },
          }}
        />
        {logo && <Image alt="company logo" width={50} height={50} src={logo} />}
      </div>
    </div>
  );
}
