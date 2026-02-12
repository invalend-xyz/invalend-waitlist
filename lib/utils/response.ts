import { NextResponse } from "next/server";

/**
 * Success response
 * @param data - Data to return in response
 * @param status - HTTP status code (default: 200)
 */
export const successResponse = (data: any, status: number = 200): NextResponse => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    {
      status,
    }
  );
};

/**
 * Validation error response
 * @param error - Error message
 */
export const validationErrorResponse = (error: string): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message: error,
    },
    {
      status: 400,
    }
  );
};

/**
 * Already exists error response
 * @param error - Error message
 */
export const alreadyExistsErrorResponse = (error: string): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message: error,
    },
    {
      status: 409,
    }
  );
};

/**
 * Not found error response
 * @param error - Error message
 */
export const notFoundErrorResponse = (error: string): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message: error,
    },
    {
      status: 404,
    }
  );
};

/**
 * Forbidden error response
 * @param error - Error message
 */
export const forbiddenErrorResponse = (error: string): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message: error,
    },
    {
      status: 403,
    }
  );
};

/**
 * Internal server error response
 * @param error - Error message
 */
export const errorResponse = (error: string= "Internal server error"): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message: error,
    },
    {
      status: 500,
    }
  );
};