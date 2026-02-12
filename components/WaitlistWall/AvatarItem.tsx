import React from "react";
import { User } from "../../types/waitlist";
import { cn } from "../../lib/utils/utils";

interface AvatarItemProps {
  user: User;
  style: {
    scale: number;
    opacity: number;
    blur: number;
  };
}

const AvatarItem: React.FC<AvatarItemProps> = ({ user, style }) => {
  return (
    <div
      className="relative flex items-center justify-center group"
      style={{
        transform: `scale(${style.scale})`,
        opacity: style.opacity,
        filter: `blur(${style.blur}px)`,
        transition:
          "transform 0.1s linear, opacity 0.1s linear, filter 0.1s linear",
        willChange: "transform, opacity, filter",
      }}>
      <div
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 rounded-full bg-white border border-border p-1 overflow-visible relative shadow-sm",
          "group-hover:border-foreground/50 transition-colors duration-300",
        )}>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-300"
          loading="lazy"
        />

        {/* Tooltip */}
        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-xs rounded whitespace-nowrap z-20 pointer-events-none">
          <span className="font-bold">{user.name}</span>
          <span className="text-neutral-400 mx-1">•</span>
          <span className="font-medium text-neutral-300">{user.role}</span>
          {/* Tooltip Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black" />
        </div>
      </div>
    </div>
  );
};

export default AvatarItem;
