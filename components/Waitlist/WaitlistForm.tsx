"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="w-full max-w-md">
      {status === "success" ? (
        <div className="p-4 bg-neutral-50 border border-border rounded-lg flex items-center gap-3 animate-in fade-in duration-500">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold text-foreground">
              You&apos;re on the list!
            </p>
            <p className="text-sm text-muted">
              We&apos;ll notify you when we launch.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-muted group-focus-within:text-foreground transition-colors" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full pl-10 pr-4 h-12 md:h-auto py-3 bg-white border border-border rounded-lg md:rounded-none text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all duration-200 text-base"
              required
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className={cn(
              "w-full h-12 md:h-auto py-3 px-6 bg-primary text-white font-medium hover:bg-primaryHover active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center rounded-lg md:rounded-none shadow-sm md:shadow-none",
            )}>
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Joining...
              </span>
            ) : (
              "Join the waitlist"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default WaitlistForm;
