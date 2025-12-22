"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

interface ValidationRequestModalProps {
  pageContext: string;
  onSubmitted?: () => void;
}

export function ValidationRequestModal({
  pageContext,
  onSubmitted,
}: ValidationRequestModalProps) {
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const isEmailValid = /.+@.+\..+/.test(email);
  const isMessageValid = message.trim().length >= 20;
  const isFormValid =
    isEmailValid && isMessageValid && organization.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("https://getform.io/f/azyqwekb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, organization, message, pageContext }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setSuccess(true);
      if (onSubmitted) onSubmitted();
      setTimeout(() => {
        const closeButton = document.querySelector<HTMLButtonElement>(
          "[data-validation-modal-close]"
        );
        closeButton?.click();
      }, 20000);
    } catch (err) {
      setError(
        "There was a problem submitting your request. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DialogContent
      aria-label="Request wallet data validation"
      className="max-w-lg rounded-xl border border-border/70 bg-background text-foreground shadow-xl backdrop-blur-sm"
    >
      <DialogHeader className="space-y-3">
        {!success && (
          <>
            <DialogTitle className="text-xl font-semibold">
              Request Wallet Data Validation
            </DialogTitle>
            <DialogDescription>
              Request access to view hidden wallet distribution data. Our team
              will review and respond via email.
            </DialogDescription>
          </>
        )}
      </DialogHeader>

      {success ? (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col items-center gap-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" aria-hidden="true" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight">
                Request Submitted
              </h2>
              <p
                className="max-w-md text-sm text-muted-foreground"
                id="validation-success-description"
              >
                Your request for wallet data access has been received.
              </p>
            </div>
            <span className="mt-1 inline-flex items-center rounded-full border border-border/80 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
              Manual Review Required
            </span>
          </div>

          <div className="w-full max-w-md space-y-3 text-left text-sm text-muted-foreground">
            <p className="text-xs font-medium uppercase tracking-wide text-foreground/70">
              What happens next
            </p>
            <div className="space-y-2">
              <p className="leading-relaxed">
                Our team will review your request and verify the details you
                provided.
              </p>
              <p className="leading-relaxed">
                Verification typically takes <span className="font-medium text-foreground">24–48 hours</span>, depending on
                demand and the complexity of your use case.
              </p>
              <p className="leading-relaxed">
                You will receive an update at <span className="font-medium text-foreground">{email}</span> when the
                review is complete.
              </p>
            </div>
          </div>

          <div className="w-full max-w-md space-y-2">
            <DialogClose asChild>
              <Button
                type="button"
                autoFocus
                className="w-full bg-muted text-foreground hover:bg-muted/80"
                data-validation-modal-close
              >
                Close
              </Button>
            </DialogClose>
            <button
              type="button"
              className="w-full text-center text-xs text-muted-foreground underline-offset-2 hover:underline"
              onClick={() => {
                setSuccess(false);
                setError(null);
              }}
            >
              Need to submit another request?
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="validation-email"
              className="text-sm font-medium text-foreground"
            >
              Email Address
            </label>
            <Input
              id="validation-email"
              type="email"
              required
              placeholder="yourname@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && email.length > 0 && (
              <p className="text-xs text-destructive">
                Please enter a valid email address.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="validation-organization"
              className="text-sm font-medium text-foreground"
            >
              Organization / Company
            </label>
            <Input
              id="validation-organization"
              type="text"
              required
              placeholder="Company or Protocol name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="validation-message"
              className="text-sm font-medium text-foreground"
            >
              Message
            </label>
            <Textarea
              id="validation-message"
              required
              minLength={20}
              placeholder="Briefly explain your use case (compliance review, research, integration, etc.)"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px]"
            />
            {!isMessageValid && message.length > 0 && (
              <p className="text-xs text-destructive">
                Message must be at least 20 characters.
              </p>
            )}
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-2 pt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                data-validation-modal-close
                className="hover:bg-[#f74a17]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-[#f74a17] text-white hover:bg-[#e04415] active:bg-[#c53b12]"
              disabled={!isFormValid || submitting}
            >
              {submitting ? "Sending..." : "Send Request"}
            </Button>
          </div>
        </form>
      )}
    </DialogContent>
  );
}
