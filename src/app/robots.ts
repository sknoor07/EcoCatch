import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Strictly prevent search engines from indexing your private admin routes
      disallow: ['/admin', '/admin-login', '/api/admin/'],
    },
    // Tells search engines exactly where to find your map of pages
    sitemap: 'https://ecocatch.in/sitemap.xml',
  }
}