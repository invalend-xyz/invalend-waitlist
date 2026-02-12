import { NextRequest } from "next/server";
import { getRateLimit, updateOrInsert } from "@/lib/repositories/rateLimits.repository";
import { forbiddenErrorResponse } from "@/lib/utils/response";
import { CONFIG } from "@/lib/constants";

export const ratelimitMiddleware = async (req: NextRequest) => {
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = xForwardedFor?.split(",")[0].trim();

    if (!ipAddress) {
        return forbiddenErrorResponse("IP Address not found");
    }

    const rateLimit = await getRateLimit(ipAddress);
    const now = Date.now();

    if (!rateLimit) {
        await updateOrInsert(ipAddress, 1, now);
        return null; 
    }

    const windowExpired = now - rateLimit.window_start > CONFIG.RATE_LIMIT_WINDOW;

    if (windowExpired) {
        await updateOrInsert(ipAddress, 1, now);
        return null; 
    }

    if (rateLimit.request_count >= CONFIG.RATE_LIMIT) {
        return forbiddenErrorResponse("Too many requests. Please try again later.");
    }

    await updateOrInsert(ipAddress, rateLimit.request_count + 1, rateLimit.window_start);
    return null;
}