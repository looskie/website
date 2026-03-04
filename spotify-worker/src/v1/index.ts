import { lastfm } from "../lastfm";
import { router } from "../router";

export const v1Router = router.get("/status", {
  async run() {
    const recentTracks = await lastfm.request("user.getRecentTracks", {
      user: "c-----dy",
      limit: 5,
      extended: 1,
    });

    const lastTrack =
      recentTracks.recenttracks.track.find(
        (track) => track["@attr"]?.nowplaying !== "true",
      ) ?? null;

    return {
      lastTrack,
      recentTracks,
    };
  },
});
