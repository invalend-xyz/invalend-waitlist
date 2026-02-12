import React from "react";
import { WaitlistData } from "../../types/waitlist";
import { formatNumber } from "../../lib/utils/utils";

interface PeopleJoinedProps {
  data: WaitlistData;
}

const PeopleJoined: React.FC<PeopleJoinedProps> = ({ data }) => {
  // Take first 5 users for display
  const displayUsers = data.users.slice(0, 5);

  return (
    <div className="flex items-center gap-4 mb-8 group cursor-default">
      <div className="flex -space-x-3">
        {displayUsers.map((user) => (
          <div
            key={user.id}
            className="relative w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-neutral-100 transition-transform duration-300 group-hover:translate-x-1"
            title={`${user.name} - ${user.role}`}>
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="relative w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center text-xs font-semibold text-muted z-10 transition-transform duration-300 group-hover:translate-x-1">
          +
        </div>
      </div>

      <div className="flex flex-col">
        <span className="text-foreground font-bold text-lg leading-none">
          {formatNumber(data.total)}
        </span>
        <span className="text-muted text-sm font-medium">
          Joined by the Community
        </span>
      </div>
    </div>
  );
};

export default PeopleJoined;
