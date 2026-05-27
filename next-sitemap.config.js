/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.airbornehrs.in',
  generateRobotsTxt: true,
  exclude: ['/admin-portal-xyz*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.airbornehrs.in/server-sitemap.xml', // Future dynamic sitemap if needed
    ],
  },
}
