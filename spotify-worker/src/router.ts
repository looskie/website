import { create, SchemaError } from "@kaito-http/core";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "https://cody.bio",
  "https://looskie.com",
];

export const router = create({
  async before(req) {
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204 }); // Return early to skip the router. This response will be passed to `.transform()`
    }
  },
  async transform(request, response) {
    const origin = request.headers.get("origin");

    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization",
      );
      response.headers.set("Access-Control-Max-Age", "86400");
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
  },
  onError: (error) => {
    if (error instanceof SchemaError) {
      return { message: error.message, status: 400 };
    }

    console.error("Unhandled error:", error);
    return { message: "An internal error occurred", status: 500 };
  },
});
