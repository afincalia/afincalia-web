/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/rgpd', destination: '/seguridad', permanent: true },
    ]
  },
}
module.exports = nextConfig
