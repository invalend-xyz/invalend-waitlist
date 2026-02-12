import { CONFIG } from "../constants";
import { Pool } from "pg";

export const db = new Pool({
    host: CONFIG.DB_HOST,
    user: CONFIG.DB_USER,
    password: CONFIG.DB_PASSWORD,
    database: CONFIG.DB_NAME,
    port: Number(CONFIG.DB_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});