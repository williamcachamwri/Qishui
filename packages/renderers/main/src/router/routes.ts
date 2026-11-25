// Vue Router Route Paths (24 routes)
export const QISHUI_ROUTES = [
  "/",
  "/player-feed",
  "/scene-mode",
  "/history",
  "/search/all",
  "/force-update",
  "/setting",
  "/me",
  "/player",
  "/draft",
  "/about",
  "/business-license",
  "/discover",
  "/playlist-square",
  "/rank",
  "/download",
  "/feedback",
  "/playlist/:id",
  "/edit-playlist/:id",
  "/album/:id",
  "/artist/:id",
  "/artist/:id/tracks",
  "/search",
  "/user/:id"
] as const;

export type QishuiRoutePath = (typeof QISHUI_ROUTES)[number];
