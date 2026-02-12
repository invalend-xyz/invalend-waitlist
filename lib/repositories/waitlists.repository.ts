import { db } from "../config/db";

/**
 * Creates a new waitlist entry with the provided email address.
 * The email is automatically converted to lowercase before insertion.
 * 
 * @param email - The email address to add to the waitlist
 * @returns The newly created waitlist record
 * @throws Database error if the insertion fails (e.g., duplicate email with unique constraint)
 */
export const createWaitlist = async (email: string) => {
    const sanitizedEmail = email.toLowerCase().trim();
    const query = `INSERT INTO waitlists (email) VALUES ($1) RETURNING *`;
    const values = [sanitizedEmail];

    const result = await db.query(query, values);

    return result.rows[0] || null;
}

/**
 * Retrieves the total count of waitlist entries in the database.
 * 
 * @returns The total number of waitlist entries as a string
 */
export const getTotalWaitlist = async () => {
    const query = `SELECT COUNT(*) FROM waitlists`;
    const result = await db.query(query);
    
    return result.rows[0].count || null;
}

/**
 * Finds a waitlist entry by email address.
 * The email is automatically converted to lowercase for case-insensitive matching.
 * 
 * @param email - The email address to search for
 * @returns The waitlist record if found, undefined otherwise
 */
export const getWaitlistByEmail = async (email: string) => {
    const sanitizedEmail = email.toLowerCase().trim();
    const query = `SELECT * FROM waitlists WHERE email = $1`;
    const values = [sanitizedEmail];
    
    const result = await db.query(query, values);
    
    return result.rows[0] || null;
}
