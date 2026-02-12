import React from "react";
import { Step } from "../../data/steps";
import { cn } from "../../lib/utils/utils";

interface StepItemProps {
  step: Step;
  style: {
    scale: number;
    opacity: number;
    blur: number;
  };
}

const StepItem: React.FC<StepItemProps> = ({ step, style }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center w-full max-w-md mx-auto py-8 transition-all duration-300",
        // Editorial asymmetry: Odd items slight left, Even items slight right on Desktop
        "md:translate-x-0", // Resetting for now to keep it strictly center-aligned per 'Center aligned' rule, but keeping structure if needed.
      )}
      style={{
        transform: `scale(${style.scale}) translateY(${style.scale === 1.05 ? "0" : "0"})`, // Subtle lift for active
        opacity: style.opacity,
        filter: `blur(${style.blur}px)`,
        willChange: "transform, opacity, filter",
      }}>
      <div className="flex flex-col items-center text-center gap-4">
        {/* Step Number Circle */}
        <div
          className={cn(
            "w-12 h-12 rounded-full border border-neutral-300 flex items-center justify-center text-sm font-medium tracking-widest",
            "bg-white/50 backdrop-blur-sm",
          )}>
          {step.label}
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            {step.title}
          </h3>
          <p className="text-sm md:text-base text-muted uppercase tracking-wider font-medium">
            {step.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StepItem;
