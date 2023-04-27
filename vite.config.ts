import { defineConfig } from 'vite'
import {resolve} from "node:path";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api/file':{
        target: 'http://localhost:8085',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/file/, ''),
      },
      '/api':{
        target: 'http://localhost:8081',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  },
  resolve: {
    alias:[
      {
        find:"@",
        replacement: resolve(__dirname,'./src')
      }
    ],
  },
  
})
