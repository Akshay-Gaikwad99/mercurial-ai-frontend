/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "cdn-icons-png.flaticon.com",
      "lh3.googleusercontent.com",
    ],
  },
  env: {
    MERCURIAL_BACKEND_API: "https://mercurial-api.nirmitee.io/api",
    APPLE_CLIENT_ID: "com.copilot.mercurialai",
    BACKEND_TOKEN_API: "https://mercurial-api.nirmitee.io/api",
    APPLE_CLIENT_SECRET:
      "eyJhbGciOiJFUzI1NiIsImtpZCI6IjZKSDU3NjlOWlgifQ.eyJhdWQiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiaXNzIjoiRkEzRkszUVU1TCIsImlhdCI6MTcxMzM1MDI3NCwiZXhwIjoxNzI4OTAyMjc1LCJzdWIiOiJjb20uY29waWxvdC5tZXJjdXJpYWxhaSJ9.UFVvdFkJBXqazdtufIBT53uXTLn7cgoGBUr6frkXnu5SBOrAjNthy12B_1vl49oA1wZTbPQbliNSCOFHJytBIw",
  },
};

module.exports = nextConfig;
