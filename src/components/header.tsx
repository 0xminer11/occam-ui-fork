"use client";

import * as React from "react";
import { APP_NAME } from "@/lib/constants";
import { ThemeToggleButton } from "@/components/theme-toggle-button";
import { DisclosureWidget } from "@/components/disclosure/DisclosureWidget";
import { DisclosureContext } from "@/components/disclosure/DisclosureProvider";
import Image from 'next/image'; // Import the Next.js Image component
import Link from 'next/link';
import bima_logo from '../../public/Bima_logo.svg';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { AlignJustify, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Manrope } from "next/font/google";

const fontManrope = Manrope({ subsets: ["latin"], variable: "--font-body" });

export function Header() {
  const pathname = usePathname();
  const [showMobileBar, setShowMobileBar] = React.useState(false);
  const toggleMobile = () => setShowMobileBar((s) => !s);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={`container flex h-14 max-w-screen-2xl items-center ${fontManrope.className}`}>
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
        {/* Desktop Nav (md+) */}
        <nav className="hidden md:flex items-center space-x-3">
          <Link href="/">
            <Button variant="ghost" className="font-medium hover:text-[#f44d1f] hover:bg-secondary/50">
              Home
            </Button>
          </Link>
          <Link href="/analytics">
            <Button variant="ghost" className="font-medium hover:text-[#f44d1f] hover:bg-secondary/50">
              Analytics
            </Button>
          </Link>
        </nav>
        {/* Right controls container (last, ml-auto) */}
        <div className="flex items-center space-x-2 ml-auto">
            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggleButton />
              <DisclosureContext.Consumer>
                {(ctx) => (ctx ? <DisclosureWidget onOpen={ctx.openDisclosure} /> : null)}
              </DisclosureContext.Consumer>
            </div>
            {/* Single mobile menu toggle (md:hidden), always visible on mobile */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                className="p-2 hover:bg-[#f74a17] hover:text-white focus-visible:ring-2 focus-visible:ring-[#f74a17] active:bg-[#e04415]"
                onClick={toggleMobile}
                aria-label="Toggle menu"
              >
                {showMobileBar ? <X className="h-5 w-5" /> : <AlignJustify className="h-5 w-5" />}
              </Button>
            </div>
        </div>
      </div>
      {/* Mobile overlay container per spec */}
      {showMobileBar && (
        <div className="lg:hidden fixed left-0 right-0 top-[3.2rem] z-50 bg-white dark:bg-[#1A1A1A] rounded-b-xl shadow-md p-4">
          <div className="flex flex-col items-center gap-3 text-sm">
            <Link href="/" className={`inline-block px-3 py-2 rounded ${pathname === '/' ? 'bg-[#F74A17] text-white' : 'text-foreground hover:bg-[#f74a17] hover:text-white'}`} onClick={() => setShowMobileBar(false)}>
              Home
            </Link>
            <Link href="/analytics" className={`inline-block px-3 py-2 rounded ${pathname === '/analytics' ? 'bg-[#F74A17] text-white' : 'text-foreground hover:bg-[#f74a17] hover:text-white'}`} onClick={() => setShowMobileBar(false)}>
              Analytics
            </Link>
            <div className="w-full flex justify-center mt-2">
              {/* Place any controls like connect buttons here if needed */}
            <ThemeToggleButton />
            {/* Disclosure widget - always visible */}
            <DisclosureContext.Consumer>
              {(ctx) => (ctx ? <DisclosureWidget onOpen={ctx.openDisclosure} /> : null)}
            </DisclosureContext.Consumer>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}