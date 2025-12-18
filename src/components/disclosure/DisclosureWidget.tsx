"use client";

import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface DisclosureWidgetProps {
  onOpen: () => void;
}

export function DisclosureWidget({ onOpen }: DisclosureWidgetProps) {
  return (
    <div className="ml-4 flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpen}
            className="h-8 w-8 hover:bg-[#f74a17] hover:text-white focus-visible:ring-2 focus-visible:ring-[#f74a17] active:bg-[#e04415]"
            aria-label="Open Important Disclosure"
          >
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Important Disclosure</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
