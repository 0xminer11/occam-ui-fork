"use client";

import * as React from "react";
import { DisclosureModal } from "./DisclosureModal";
import { DisclosureWidget } from "./DisclosureWidget";

const STORAGE_KEY = "bima_disclosure_seen";

export const DisclosureContext = React.createContext<{
  openDisclosure: () => void;
} | null>(null);

export function DisclosureProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    try {
      const seen = sessionStorage.getItem(STORAGE_KEY);
      if (seen !== "true") {
        setOpen(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      try {
        sessionStorage.setItem(STORAGE_KEY, "true");
      } catch (e) {}
    }
  };

  const openDisclosure = () => setOpen(true);

  return (
    <DisclosureContext.Provider value={{ openDisclosure }}>
      {children}
      <DisclosureModal open={open} onOpenChange={onOpenChange} />
    </DisclosureContext.Provider>
  );
}
