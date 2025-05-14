export const isProduction = process.env.NODE_ENV === "production";

export const SITE_URL = isProduction
  ? "https://localhost:3000"
  : "https://local.site.com";

export const GITHUB_USERNAME = "phnglh";

export const SITE_NAME = "Noname";
export const SITE_DESCRIPTION =
  "A personal Next.js.";
export const SITE_KEYWORDS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
];

export const SITE_GITHUB_URL = "https://github.com/phnglh/portfolio";
export const SITE_FACEBOOK_URL = "https://www.facebook.com";
export const SITE_INSTAGRAM_URL = "https://www.instagram.com";
