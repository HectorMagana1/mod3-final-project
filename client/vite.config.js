import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'http://localhost:3000',
      '/auth':'http://localhost:3000'
    }
  },
  plugins: [react()],
})
//https://mod3-backend-33gx.onrender.com