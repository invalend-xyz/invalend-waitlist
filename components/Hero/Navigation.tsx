import React from "react";
import { cn } from "../../lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "waitlist", label: "JOIN WAITLIST" },
  { id: "how-it-works", label: "HOW IT WORKS" },
  { id: "protocol", label: "PROTOCOL" },
  { id: "docs", label: "DOCS" },
];

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex flex-col gap-2 md:gap-3 my-8 md:my-12 w-full">
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "group relative flex items-center justify-center md:justify-start gap-3 w-full md:w-fit px-4 py-3 md:p-0 md:py-1 rounded-lg md:rounded-none transition-all duration-200 select-none",
              // Mobile Styling: Button-like
              isActive
                ? "bg-foreground text-background md:bg-transparent md:text-foreground font-semibold shadow-sm md:shadow-none"
                : "bg-neutral-100 text-muted md:bg-transparent hover:bg-neutral-200 md:hover:bg-transparent md:hover:text-foreground",
              // Desktop Typography
              "text-sm md:text-base tracking-wide font-medium",
            )}>
            {/* Desktop Active Indicator */}
            {isActive && (
              <span className="hidden md:block w-2 h-2 bg-foreground rounded-sm animate-pulse" />
            )}

            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

export default Navigation;
