import { NextRequest } from 'next/server';
import { create } from '@/lib/controller/waitlists.contoller';
import { ratelimitMiddleware } from '@/lib/middleware/rateLimit.middleware';

export const POST = async (req: NextRequest) => {
  const rateLimitResponse = await ratelimitMiddleware(req);
  
  if (rateLimitResponse) {
    return rateLimitResponse; 
  }

  return create(req);
};
