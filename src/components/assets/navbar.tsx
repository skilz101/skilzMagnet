"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import GoogleOAuthButton from "../auth/google";

export default function NavBar() {
  return (
    <nav className="flex justify-between fixed items-center top-0 px-6 py-3 left-0 z-50 w-full backdrop-blur-md bg-background/50 shadow-sm">
      <Image
        src="/Group-7.png"
        alt="skilz magnet. a saas for lead generation"
        width={50}
        height={50}
      />
      <ul className="flex items-center space-x-5 cursor-pointer">
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#">LinkedIn</Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow us on linkedin</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>

        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#">Instagram</Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow us on Instagram</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
        <li>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="#">Threads</Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Follow us on Threads</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </li>
      </ul>

      <GoogleOAuthButton />
    </nav>
  );
}
