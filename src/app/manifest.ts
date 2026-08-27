import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'EcoCatch Energy Solutions',
    short_name: 'EcoCatch',
    description: 'End-to-end biogas plant engineering, manufacturing, and installation across India.',
    start_url: '/',
    display: 'standalone', // This makes it look like a native app (hides the browser URL bar)
    background_color: '#FAF9F6',
    theme_color: '#2D5A3D',
    icons: [
      {
        src: '/mobile/icon_192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/mobile/icon_512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}