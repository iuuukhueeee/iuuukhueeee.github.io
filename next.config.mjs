/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export'
  // async rewrites() {
  //   return [
  //     {
  //       "source": "/stats/:match*",
  //       "destination": "https://cloud.umami.is/:match*"
  //     }
  //   ]
  // }

};

export default nextConfig;
