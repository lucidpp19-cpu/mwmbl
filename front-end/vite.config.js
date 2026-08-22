import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'

export default {
  root: './src',
  // Use the root path so the Vercel preview serves the app at `/`.
  // The backend can still mount the built assets under `/static/` in production.
  base: '/',
  publicDir: '../assets',
  build: {
    outDir: '../dist',
    manifest: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/index.js'),
        stats: resolve(__dirname, 'src/stats/index.html'),
        terms: resolve(__dirname, 'src/terms-and-conditions/index.html'),
        privacy: resolve(__dirname, 'src/data-privacy/index.html'),
      },
    },
    minify: false,
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ]
}
