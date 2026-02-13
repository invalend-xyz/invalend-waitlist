import { NextRequest } from "next/server";
import {
  createWaitlist,
  getTotalWaitlist,
  getWaitlistByEmail,
} from "../repositories/waitlists.repository";
import { validate } from "../utils/request";
import { verifyCaptcha } from "../utils/captcha";
import {
  alreadyExistsErrorResponse,
  errorResponse,
  forbiddenErrorResponse,
  validationErrorResponse,
  successResponse,
} from "../utils/response";
import { waitlistSchema } from "../validations/waitlist.schema";

/**
 * Creates a new waitlist entry.
 * Validates the request body, verifies captcha, and checks for duplicate emails before insertion.
 *
 * @param req - Next.js request object containing the email and captchaToken in the body
 * @returns Success response with the created waitlist entry, or error response
 */
export const create = async (req: NextRequest) => {
  try {
    const validatedData = await validate(waitlistSchema, "body")(req);

    if (!validatedData.success) {
      const error = JSON.parse(validatedData.error.message);
      return validationErrorResponse(error[0].message);
    }

    // Verify reCAPTCHA v3 token
    const captchaResult = await verifyCaptcha(validatedData.data.captchaToken);
    if (!captchaResult.success) {
      return forbiddenErrorResponse("Captcha verification failed");
    }

    const existingEmail = await getWaitlistByEmail(validatedData.data.email);

    if (existingEmail) {
      return alreadyExistsErrorResponse("Email already exists in waitlist");
    }

    const result = await createWaitlist(validatedData.data.email);

    return successResponse(result);
  } catch (error) {
    return errorResponse();
  }
};

/**
 * Retrieves the total count of waitlist entries.
 *
 * @returns Success response with the total count
 */
export const getTotal = async () => {
  try {
    const result = await getTotalWaitlist();

    return successResponse({ total: result });
  } catch (error) {
    return errorResponse();
  }
};
