import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createProxyMiddleware } from 'http-proxy-middleware';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      proxy: {
        '/api': {
          target: 'https://laravel-api.albrecht.uk.com',
          changeOrigin: true,
          secure: false,
          ws: false,
          onProxyReq: (proxyReq) => {
            proxyReq.setHeader('Origin', 'https://laravel-api.albrecht.uk.com');
          },
          pathRewrite: {
            '^/api': '/api',
          },
        },
      },
    },
})
