import React from "react";

const StatusBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 w-fit mb-6 animate-in slide-in-from-top-2 fade-in duration-700">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span className="text-[10px] md:text-xs font-semibold tracking-wide uppercase text-neutral-600">
        Live on Base Sepolia Testnet
      </span>
    </div>
  );
};

export default StatusBadge;
