import { Ratelimit } from "@upstash/ratelimit";
import { NextResponse, type NextRequest } from "next/server";
import { redis } from "./utils/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "20 s"),
});

// Define which routes you want to rate limit
export const config = {
  matcher: "/api/spotify",
};

export default async function middleware(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.json(
        {
          success: false,
          error: {
            message: "nahhhhh rate limited",
          },
        },
        {
          status: 429,
        }
      );
}
