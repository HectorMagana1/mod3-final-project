import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://mod3-backend-33gx.onrender.com',
      '/auth':'https://mod3-backend-33gx.onrender.com'
    }
  },
  plugins: [react()],
})
//https://mod3-backend-33gx.onrender.com