// Cursor app identity: the simulated viewer for local development.
// Plain JS twin of identity.dev.ts so Turbopack can resolve identity.ts imports of ./identity.dev.js.

/** @type {import('./identity').DevViewer | null} */
export const DEV_VIEWER = {
  sub: "user:dev",
  email: "dev@example.com",
  name: "Dev Viewer",
  teamId: 1,
  teamRole: "admin",
};
