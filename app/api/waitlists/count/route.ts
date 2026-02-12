import { NextRequest } from 'next/server';
import { getTotal } from '@/lib/controller/waitlists.contoller';

export const GET = async (req: NextRequest) => {
  return getTotal();
};
