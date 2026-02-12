export const CONFIG = {
    APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "postgres",
    DB_PASSWORD: process.env.DB_PASSWORD || "postgres",
    DB_NAME: process.env.DB_NAME || "postgres",
    DB_PORT: process.env.DB_PORT || "5432",
    RATE_LIMIT: Number(process.env.RATE_LIMIT) || 10,
    RATE_LIMIT_WINDOW: Number(process.env.RATE_LIMIT_WINDOW) || 60000,
}