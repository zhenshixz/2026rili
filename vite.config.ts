import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      // 1. 添加这一行，解决 GitHub Pages 路径问题
      base: './', 
      
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      base: './',  
      plugins: [react()],
      define: {
        // 这里的 env.GEMINI_API_KEY 在部署时需要从 GitHub Secrets 获取（见下文）
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
