import { env } from "cloudflare:workers";
import { LastFM } from "lastfm-sdk";

export const lastfm = new LastFM({
  apiKey: env.LASTFM_API_KEY ?? "",
});
