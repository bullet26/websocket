import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [react(), svgr()],
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
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {},
    },
  },
})
