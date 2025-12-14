/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // Supported language
    locales: ['en', 'fr', 'tr', 'it', 'zh_CN', 'zh_TW', 'pl', 'pt', 'he_IL'],
    // default language
    defaultLocale: 'en',
  },
  // 👇 Force Turbopack à considérer CE dossier comme racine
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
