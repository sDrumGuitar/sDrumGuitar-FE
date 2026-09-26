import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 3000,
    // 로컬 인증서가 있을 때만 HTTPS (CI 빌드에는 .pem 없음)
    https: fs.existsSync(path.resolve(__dirname, './192.168.219.127+2.pem'))
      ? {
          key: fs.readFileSync(
            path.resolve(__dirname, './192.168.219.127+2-key.pem'),
          ),
          cert: fs.readFileSync(
            path.resolve(__dirname, './192.168.219.127+2.pem'),
          ),
        }
      : undefined,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
