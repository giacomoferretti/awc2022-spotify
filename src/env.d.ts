/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPOTIFY_CLIENT_ID: string;
  readonly VITE_SPOTIFY_CLIENT_SECRET: string;
  readonly VITE_GOOGLE_ANALYTICS: string;
  readonly VITE_SITE_TITLE: string;
  readonly VITE_SITE_LONG_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
