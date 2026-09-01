/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/precios', destination: '/#piloto', permanent: true },
      { source: '/rgpd', destination: '/#seguridad', permanent: true },
      { source: '/actas', destination: '/#como', permanent: true },
      { source: '/como-funciona', destination: '/#como', permanent: true },
      { source: '/blog', destination: '/', permanent: true },
    ]
  },
}
module.exports = nextConfig
