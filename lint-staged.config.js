const config = {
  "**/*.{ts,tsx}": [
    "prettier --write",
    "eslint --cache --fix",
    () => "tsc -p tsconfig.json --noEmit",
  ],
};

export default config;
