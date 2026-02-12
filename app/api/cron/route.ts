import { db } from "@/lib/config/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    await db.query("SELECT * FROM waitlists LIMIT 1");
    return NextResponse.json({ message: "OK" });
}