import { db } from "../config/db";

export const updateOrInsert = async (ipAddress: string, requestCount: number, windowStart: number) => {
    const query = `INSERT INTO rate_limits (ip_address, request_count, window_start) VALUES ($1, $2, $3) ON CONFLICT (ip_address) DO UPDATE SET request_count = $2, window_start = $3`;
    const values = [ipAddress, requestCount, windowStart];
    
    await db.query(query, values);
}

export const getRateLimit = async (ipAddress: string) => {
    const query = `SELECT * FROM rate_limits WHERE ip_address = $1`;
    const values = [ipAddress];
    const result = await db.query(query, values);
    return result.rows[0] || null;
}