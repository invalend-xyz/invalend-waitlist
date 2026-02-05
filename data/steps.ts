export interface Step {
  id: number;
  label: string;
  title: string;
  description: string;
}

export const stepsData: Step[] = [
  {
    id: 1,
    label: "01",
    title: "User deposits collateral",
    description: "Smart Contract Escrow",
  },
  {
    id: 2,
    label: "02",
    title: "Community Liquidity",
    description: "Backs the position instantly",
  },
  {
    id: 3,
    label: "03",
    title: "Leverage Activated",
    description: "Up to 5x via protocol pool",
  },
  {
    id: 4,
    label: "04",
    title: "On-Chain Settlement",
    description: "Transparent & immutable",
  },
];
