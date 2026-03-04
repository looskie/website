import { createKaitoHTTPClient } from "@kaito-http/client";
import type { API } from "../../spotify-worker/src";

export const spotifyAPI = createKaitoHTTPClient<API>({
  base: "https://spotify.cody.bio",
});
