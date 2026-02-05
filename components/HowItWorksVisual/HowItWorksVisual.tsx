"use client";

import React, { useRef, useMemo } from "react";
import { stepsData } from "../../data/steps";
import StepItem from "./StepItem";
import { useAutoScroll } from "../WaitlistWall/useAutoScroll";

const HowItWorksVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration
  const ITEM_HEIGHT = 220;

  // Desktop Data: Loop
  const desktopSteps = useMemo(() => {
    const steps = [...stepsData];
    return [...steps, ...steps, ...steps].map((s, i) => ({
      ...s,
      uniqueId: `desk-${s.id}-${i}`,
    }));
  }, []);

  const contentHeight = desktopSteps.length * ITEM_HEIGHT;

  const { scrollY, togglePause } = useAutoScroll({
    speed: 0.4,
    contentHeight: contentHeight / 3,
  });

  return (
    <div className="w-full h-full">
      {/* --- MOBILE VIEW: Horizontal Scroll Snap --- */}
      <div className="md:hidden w-full h-[400px] flex items-center overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 gap-4">
        {stepsData.map((step) => (
          <div
            key={`mob-${step.id}`}
            className="w-full flex-shrink-0 snap-center flex items-center justify-center p-4">
            <div className="bg-white border border-border rounded-2xl p-8 w-full max-w-sm flex flex-col items-center text-center shadow-sm">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-muted mb-4">
                {step.label}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted uppercase tracking-wide">
                {step.description}
              </p>
            </div>
          </div>
        ))}
        {/* Spacer for right padding */}
        <div className="w-2 flex-shrink-0" />
      </div>

      {/* --- DESKTOP VIEW: Vertical Auto Scroll --- */}
      <div
        ref={containerRef}
        className="hidden md:block w-full h-[600px] overflow-hidden relative"
        onMouseEnter={() => togglePause(true)}
        onMouseLeave={() => togglePause(false)}>
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-neutral-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 to-transparent z-10 pointer-events-none" />

        <div
          className="flex flex-col items-center w-full will-change-transform"
          style={{ transform: `translateY(-${scrollY}px)` }}>
          {desktopSteps.map((step, index) => (
            <div
              key={step.uniqueId}
              style={{ height: ITEM_HEIGHT }}
              className="w-full flex items-center justify-center">
              <StepItem step={step} style={{ scale: 1, opacity: 1, blur: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorksVisual;
