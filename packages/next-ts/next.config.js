/** @type {import('next').NextConfig} */

const path = require("path");
// load root .env file
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const nextConfig = {
  reactStrictMode: true,
  //   to temprory ignore eslint error on build
  //   eslint: {
  //     ignoreDuringBuilds: true,
  //   },
  strictMode: true,
};

module.exports = nextConfig;
