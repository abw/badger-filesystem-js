import { defineConfig } from 'vitepress'

const menuItems = [
  { text: 'Getting Started', link: '/getting-started' },
  { text: 'Directories', link: '/directories' },
  { text: 'Directory Methods', link: '/directory-methods' },
  { text: 'Files', link: '/files' },
  { text: 'File Methods', link: '/file-methods' },
  { text: 'Path Base Class', link: '/path' },
  { text: 'Codecs', link: '/codecs' },
]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Badger Filesystem",
  description: "Javascript Filesystem Utilities",
  head: [['link', { rel: 'icon', href: '/badger-filesystem/images/badger3.svg' }]],
  base: '/badger-filesystem/',
  outDir: '../docs',
  lastUpdated: true,
  themeConfig: {
    siteTitle: 'Badger Filesystem',
    logo: '/images/badger3.svg',
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Documentation',
        items: menuItems,
      },
      { text: 'Reference', link: '/reference' },
    ],
    sidebar: menuItems,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/abw/badger-filesytem' }
    ],
    footer: {
      message: 'Built by Badgers',
      copyright: '©️ Andy Wardley 2022-2024'
    }
  }
})