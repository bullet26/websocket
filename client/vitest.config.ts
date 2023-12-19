import { defineConfig } from 'vitest/config'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  // @ts-ignore
  plugins: [svgr()],
  base: './',
  resolve: {
    alias: {
      assets: '/src/assets/',
      components: '/src/components/',
      store: '/src/store/',
      hooks: '/src/hooks/',
      routes: '/src/routes/',
      pages: '/src/pages/',
      theme: '/src/theme/',
      types: '/src/types/',
      UI: '/src/UI/',
      utils: '/src/utils/',
      websocket: '/src/websocket/',
      api: '/src/api/',
    },
  },
})
