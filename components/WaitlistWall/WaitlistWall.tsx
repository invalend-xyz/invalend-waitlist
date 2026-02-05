"use client";

import React, { useRef, useMemo } from "react";
import { WaitlistData, User } from "../../types/waitlist";
import AvatarItem from "./AvatarItem";
import { useAutoScroll } from "./useAutoScroll";

interface WaitlistWallProps {
  data: WaitlistData;
}

const WaitlistWall: React.FC<WaitlistWallProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configuration
  const COLUMNS_DESKTOP = 4;
  const ITEM_HEIGHT = 100; // Approx height including gap allocation

  // 1. Prepare Data: Multiply existing data to ensure smooth infinite feel
  const allUsers = useMemo(() => {
    let users: User[] = [];
    // Repeat data until we have enough to scroll comfortably (e.g., 60 items)
    while (users.length < 60) {
      users = [
        ...users,
        ...data.users.map((u) => ({ ...u, id: `${u.id}-${users.length}` })),
      ];
    }
    return users;
  }, [data.users]);

  // Calculate height based on desktop columns for the logic base,
  // but responsiveness is handled by grid classes.
  const contentHeight = (allUsers.length / COLUMNS_DESKTOP) * ITEM_HEIGHT;

  // 2. Init Scroll Hook
  const { scrollY, togglePause } = useAutoScroll({
    speed: 0.8,
    contentHeight: contentHeight,
  });

  return (
    <div
      ref={containerRef}
      className="w-full h-[50vh] md:h-[600px] overflow-hidden relative mask-linear-fade"
      onMouseEnter={() => togglePause(true)}
      onMouseLeave={() => togglePause(false)}
      onTouchStart={() => togglePause(true)}
      onTouchEnd={() => togglePause(false)}>
      {/* Top and Bottom Fade Masks */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Grid Container */}
      <div
        className="grid grid-cols-3 md:grid-cols-4 gap-4 px-4 pb-20 pt-10 will-change-transform"
        style={{ transform: `translateY(-${scrollY}px)` }}>
        {allUsers.map((user, index) => (
          <AvatarItem
            key={`${user.id}-${index}`}
            user={user}
            style={{ scale: 1, opacity: 1, blur: 0 }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaitlistWall;
