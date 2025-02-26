/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        "source": "/scripts.js",
        "destination": "https://cloud.umami.is/script.js"
      },
      {
        "source": "/api/send",
        "destination": "https://analytics.umami.is/api/send"
      }
    ]
  }

};

export default nextConfig;
