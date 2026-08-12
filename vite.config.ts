import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/USSD/',

    plugins: [
      react(),
      tailwindcss(),

      VitePWA({
        registerType: 'autoUpdate',

        manifest: {
          name: 'صانع الكود المختصر USSD - المحافظ الفلسطينية',
          short_name: 'صانع الكود USSD',
          description:
            'تطبيق تحويل الأموال السريع عبر الأكواد المختصرة للمحافظ الإلكترونية الفلسطينية',

          theme_color: '#3730a3',
          background_color: '#1e1b4b',

          display: 'standalone',
          orientation: 'portrait',

          start_url: '/USSD/',
          scope: '/USSD/',

          icons: [
            {
              src: 'app_icon.jpg',
              sizes: '192x192',
              type: 'image/jpeg',
              purpose: 'any',
            },
            {
              src: 'app_icon.jpg',
              sizes: '192x192',
              type: 'image/jpeg',
              purpose: 'maskable',
            },
            {
              src: 'app_icon.jpg',
              sizes: '512x512',
              type: 'image/jpeg',
              purpose: 'any',
            },
            {
              src: 'app_icon.jpg',
              sizes: '512x512',
              type: 'image/jpeg',
              purpose: 'maskable',
            },
          ],
        },
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
