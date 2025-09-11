import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    server: {
      port: process.env.VITE_PORT || 5173, // Utiliser le port depuis l'env ou 5173 par défaut
      host: true,
      open: true,
      strictPort: false, // Permettre un port alternatif si le port est occupé
      cors: true // Active CORS pour le développement
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        // Suppression de l'alias sockjs-client problématique
      },
    },
    define: {
      'process.env': {
        NODE_ENV: JSON.stringify(mode),
        // Suppression des variables reCAPTCHA
      },
      global: 'globalThis',
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'axios'
        // Suppression de sockjs-client des dépendances optimisées
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            http: ['axios']
          }
        }
      }
    }
  }
})
