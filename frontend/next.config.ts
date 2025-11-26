// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://localhost:5000/api/:path*',
//       },
//     ];
//   },
// }

// module.exports = nextConfig

const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;
