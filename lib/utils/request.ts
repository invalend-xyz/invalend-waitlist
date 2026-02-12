import { NextRequest } from "next/server";
import { validationErrorResponse } from "./response";

/**
 * Validate request data using Zod schema
 * @param schema - Zod schema to validate against
 * @param reqType - Type of data to validate (body, query, or params)
 * @returns Async function that validates and returns parsed data or error response
 */
export const validate = (
  schema: any, 
  reqType: "body" | "query" | "params" = "body"
) => {
  return async (req: NextRequest, params?: any) => {
    let reqData: any;
    if (reqType === "body") {
      reqData = await req.json();
    } else if (reqType === "query") {
      const searchParams = req.nextUrl.searchParams;
      reqData = Object.fromEntries(searchParams.entries());
    } else if (reqType === "params") {
      reqData = params;
    }
      
    const result = schema.safeParse(reqData);
    return result;
  }
}