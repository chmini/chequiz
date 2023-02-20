interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
