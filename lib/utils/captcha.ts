/**
 * Server-side reCAPTCHA v3 token verification utility.
 * Validates captcha tokens against Google's siteverify API.
 */

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY!;
const CAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const SCORE_THRESHOLD = 0.5;

interface CaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  "error-codes"?: string[];
}

/**
 * Verifies a reCAPTCHA v3 token against Google's API.
 *
 * @param token - The captcha token from the client
 * @returns Object with `success` (true if score >= threshold) and `score`
 */
export const verifyCaptcha = async (
  token: string,
): Promise<{ success: boolean; score: number }> => {
  try {
    const response = await fetch(CAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: CAPTCHA_SECRET_KEY,
        response: token,
      }),
    });

    const data: CaptchaVerifyResponse = await response.json();

    return {
      success: data.success && data.score >= SCORE_THRESHOLD,
      score: data.score ?? 0,
    };
  } catch {
    return { success: false, score: 0 };
  }
};
