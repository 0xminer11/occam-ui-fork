"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface DisclosureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DisclosureModal({ open, onOpenChange }: DisclosureModalProps) {
  React.useEffect(() => {
    const prev = typeof document !== 'undefined' ? document.body.style.overflow : undefined;
    if (open) {
      try {
        document.body.style.overflow = 'hidden';
      } catch (e) {}
    } else {
      try {
        if (prev !== undefined) document.body.style.overflow = prev;
      } catch (e) {}
    }
    return () => {
      try {
        if (prev !== undefined) document.body.style.overflow = prev;
      } catch (e) {}
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full h-[85vh] flex flex-col overflow-hidden">

        <DialogHeader className="shrink-0 sticky top-0 z-10 bg-card/80 backdrop-blur py-3 border-b border-border/20">
          <div className="flex items-start justify-between gap-4 w-full">
            <DialogTitle className="text-2xl font-semibold leading-tight">
              Important Disclosure on USBD, Occam, Issuance Methodologies, and Asset Representation
            </DialogTitle>
            <div className="ml-4 flex items-start">
              <DialogClose aria-label="Close" className="rounded-sm opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div
          className="flex-1 min-h-0 overflow-y-auto px-6 py-4 prose prose-invert max-w-none text-sm leading-7 text-muted-foreground space-y-6 persistent-scrollbar pb-20 pr-2"
          tabIndex={0}
          role="region"
          aria-label="Important disclosure content"
        >
            {/* <h2 className="text-lg font-semibold text-foreground">Important Disclosure on USBD, Occam, Issuance Methodologies, and Asset Representation</h2> */}

            <p className="text-sm text-muted-foreground leading-7">
              This disclosure is provided to explain the structure, issuance pathways, verification methodologies, and
              reporting practices associated with USBD and the Occam framework. Its purpose is to ensure accurate
              interpretation, regulatory alignment, and transparency for users, partners, and third parties.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">1. Overview of the Product and Protocol Architecture</h3>
            <p className="text-sm text-muted-foreground leading-7">
              USBD is a programmable on-chain unit designed to support participation in credit, yield, liquidity, and
              ecosystem incentive programs. USBD is issued through a unified protocol architecture; however, the manner
              in which USBD is introduced into circulation depends on the issuance pathway used.
            </p>
            <p className="text-sm text-muted-foreground leading-7">
              Bima has intentionally designed the protocol to support multiple issuance and verification frameworks, each
              tailored to the operational, regulatory, and compliance constraints of different participant types. These
              frameworks are not interchangeable and are disclosed separately to prevent misinterpretation.
            </p>
            <p className="text-sm text-muted-foreground leading-7">
              Occam is Bima’s self-custodial verification and coordination framework. Occam enables institutions,
              including regulated exchanges and licensed custodians, to participate in USBD-based programs without
              transferring assets into on-chain smart contracts or relinquishing custody or operational control.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">2. Distinct Issuance Pathways</h3>
            <p className="text-sm text-muted-foreground leading-7">
              USBD may be issued or reflected through more than one pathway. Each pathway represents a different
              relationship between assets, verification, and protocol mechanics.
            </p>

            <h4 className="mt-3 text-sm font-semibold text-foreground">(a) CDP-Based Issuance (Protocol-Native Issuance)</h4>
            <p className="text-sm text-muted-foreground leading-7">Under the CDP issuance pathway:</p>
            <ol className="list-decimal ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Assets are deposited directly into on-chain smart contracts</li>
              <li className="text-sm text-muted-foreground">These assets function as collateral in the protocol-native sense</li>
              <li className="text-sm text-muted-foreground">Position management, enforcement, and resolution are governed by deterministic smart-contract logic</li>
              <li className="text-sm text-muted-foreground">Processes such as margining, liquidation, and settlement are automated and executed at the protocol level</li>
            </ol>
            <p className="text-sm text-muted-foreground leading-7">
              This pathway reflects a traditional permissionless DeFi architecture in which assets are explicitly
              committed to the protocol and subject to protocol-defined rules.
            </p>

            <h4 className="mt-3 text-sm font-semibold text-foreground">(b) Occam TVV-Based Issuance (Verification-Driven Issuance)</h4>
            <p className="text-sm text-muted-foreground leading-7">Under the Occam Total Value Verified (TVV) framework:</p>
            <ol className="list-decimal ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Assets remain held in self-custodial or regulated custodial environments</li>
              <li className="text-sm text-muted-foreground">USBD issuance and reporting are based on Proof of Reserves and related attestations</li>
              <li className="text-sm text-muted-foreground">Assets are associated with issuance through verification and representation, rather than protocol-level asset commitment</li>
            </ol>
            <p className="text-sm text-muted-foreground leading-7">
              Occam TVV is designed for participants that are unable or unwilling, for regulatory or operational reasons,
              to place assets into external smart contracts, but who nevertheless require on-chain representation and participation.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">3. Nature of Asset Association Under Occam TVV</h3>
            <p className="text-sm text-muted-foreground leading-7">
              Assets associated with Occam TVV are registered, delegated, and verified for the purposes of transparency,
              reporting, and program participation.
            </p>
            <p className="text-sm text-muted-foreground leading-7">Specifically:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Wallet addresses and custodial accounts are explicitly registered with the Bima Foundation as designated addresses for Proof of Reserves and TVV reporting</li>
              <li className="text-sm text-muted-foreground">These addresses are monitored and attested to using cryptographic techniques, including zero-knowledge-based proofs on Bitcoin, as well as custodial confirmations and disclosures</li>
              <li className="text-sm text-muted-foreground">The assets remain continuously subject to the custody, governance, and regulatory oversight of the holding entity</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">
              The relationship between these assets and USBD issuance is therefore not identical to the relationship
              between assets deposited into CDP smart contracts.
            </p>
            <p className="text-sm text-muted-foreground leading-7">
              In particular, assets associated with Occam TVV are not treated as “collateral” in the organic, protocol-native sense applicable to CDP issuance. They are not placed under protocol control, are not subject to automated margin or liquidation logic, and are not enforced through smart-contract seizure mechanisms.
            </p>
            <p className="text-sm text-muted-foreground leading-7">
              Instead, these assets are pledged and represented through Proof of Reserves, serving as a basis for verification,
              transparency, and participation under a self-custodial framework.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">4. Regulatory and Exchange Context</h3>
            <p className="text-sm text-muted-foreground leading-7">
              Many institutional participants, including regulated centralized exchanges and licensed custodians, operate under legal and supervisory frameworks that impose strict requirements on asset handling.
            </p>
            <p className="text-sm text-muted-foreground leading-7">In such contexts:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Assets must remain within the custody and operational domain of the licensed entity</li>
              <li className="text-sm text-muted-foreground">External encumbrance, immobilization, or smart-contract control may not be permissible</li>
              <li className="text-sm text-muted-foreground">Risk management, enforcement, and resolution are governed by institutional policies, contractual arrangements, and applicable law</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">
              Occam TVV is expressly designed to accommodate these requirements by enabling on-chain representation without altering the legal or operational treatment of the underlying assets.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">5. Segmentation, Restrictions, and Non-Commingling</h3>
            <p className="text-sm text-muted-foreground leading-7">
              Although USBD is issued from a common contract architecture:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">USBD issued via CDP pathways and USBD associated with Occam TVV pathways are logically, operationally, and functionally segmented</li>
              <li className="text-sm text-muted-foreground">Institutional or exchange-aligned USBD is subject to restrictions on circulation and usage</li>
              <li className="text-sm text-muted-foreground">Such balances are not intended to provide exit liquidity to permissionless or retail users</li>
              <li className="text-sm text-muted-foreground">Retail and permissionless USBD remains governed exclusively by CDP-based mechanics</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">
              This segmentation is a core design principle and is enforced to prevent conflation of issuance frameworks and misunderstanding of reported values.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">6. Reporting, Dashboards, and Registered Addresses</h3>
            <p className="text-sm text-muted-foreground leading-7">
              All balances and addresses displayed on occam.bima.money represent registered and delegated addresses that have been explicitly designated to the Bima Foundation for the purposes of:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Proof of Reserves</li>
              <li className="text-sm text-muted-foreground">Total Value Verified (TVV) reporting</li>
              <li className="text-sm text-muted-foreground">On-chain representation under a self-custodial, non-locking framework</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">
              For exchange-related entities, assets remain free-flowing and operationally available within their custodial environment. No protocol-level locking occurs. Verification and reporting are achieved through registration, attestations, and cryptographic proofs rather than through asset immobilization.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">7. Interpretation Guidance</h3>
            <p className="text-sm text-muted-foreground leading-7">Values reported under Occam TVV:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Represent verified asset representation and association</li>
              <li className="text-sm text-muted-foreground">Reflect participation and transparency, not protocol-native collateralization</li>
              <li className="text-sm text-muted-foreground">Should not be interpreted as implying identical leverage, margining, liquidation, or enforcement mechanics as CDP-based issuance</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">
              Accordingly, CDP issuance metrics and Occam TVV metrics are displayed separately and should be evaluated independently.
            </p>

            <h3 className="mt-4 text-base font-semibold text-foreground">8. Purpose of This Disclosure</h3>
            <p className="text-sm text-muted-foreground leading-7">This disclosure framework is intended to:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li className="text-sm text-muted-foreground">Provide clarity regarding different issuance and verification methodologies</li>
              <li className="text-sm text-muted-foreground">Prevent misinterpretation of reported values as representing a uniform collateral pool</li>
              <li className="text-sm text-muted-foreground">Align public reporting with institutional, regulatory, and compliance expectations</li>
            </ul>
            <p className="text-sm text-muted-foreground leading-7">Users and third parties are encouraged to consider the applicable issuance pathway and asset treatment when interpreting any reported data.</p>

            <h3 className="mt-4 text-base font-semibold text-foreground">9. Further Information</h3>
            <p className="text-sm text-muted-foreground leading-7">
              For additional information regarding USBD, Occam, issuance frameworks, or verification methodologies, please refer to the documentation available on <a href="https://bima.money" className="text-primary underline">https://bima.money</a>.
            </p>
            <p className="text-sm text-muted-foreground leading-7">Questions regarding legal, compliance, or institutional participation may be directed to:</p>
            <p className="font-mono text-sm">legal@bima.money</p>
        </div>

        <DialogFooter className="shrink-0 sticky bottom-0 z-10 bg-card/80 backdrop-blur py-3 border-t border-border/20">
          <div className="flex w-full items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">You can reopen this disclosure anytime from the top navigation.</p>
            <div>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                I Understand
              </Button>
            </div>
          </div>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
