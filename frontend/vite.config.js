import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement en fonction du mode (dev/prod)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    // Expose les variables d'environnement au client
    define: {
      'process.env': {
        VITE_RECAPTCHA_SITE_KEY: JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY || '6Lf6Vp0rAAAAAMghRpLjSbffcSEF7Z-JGBZbZA0U'),
        VITE_API_URL: JSON.stringify(env.VITE_API_URL || 'http://localhost:8084/api')
      }
    },
    server: {
      port: 3000,
      host: true,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8084',
          changeOrigin: true,
          secure: false,
          ws: true,
        }
      }
    },
    optimizeDeps: {
      include: ['react-google-recaptcha-v3'],
      force: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            recaptcha: ['react-google-recaptcha-v3']
          }
        }
      }
    }
  }
})
