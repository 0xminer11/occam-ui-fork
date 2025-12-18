"use client";

import * as React from "react";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { DisclosureWidget } from "@/components/disclosure/DisclosureWidget";
import { DisclosureContext } from "@/components/disclosure/DisclosureProvider";
import Image from 'next/image'; // Import the Next.js Image component
import Link from 'next/link';
import bima_logo from '../../public/Bima_logo.svg';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          {/* Add the SVG here */}
          <Image
            src={bima_logo}
            alt="Bima Logo" // It's good practice to add an alt attribute
            width={96}// Specify a width (adjust as needed)
            height={96} //Specify a height (adjust as needed)
            className="mr-2 ml-7"// add some margin to the right
          />
        
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <nav className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium text-foreground/80 hover:underline">
              Home
            </Link>
            <Link href="/analytics" className="text-sm font-medium text-foreground/80 hover:underline">
              analytics
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggleButton />
            {/* Disclosure widget - always visible */}
            <DisclosureContext.Consumer>
              {(ctx) => (ctx ? <DisclosureWidget onOpen={ctx.openDisclosure} /> : null)}
            </DisclosureContext.Consumer>
          </div>
        </div>
      </div>
    </header>
  );
}