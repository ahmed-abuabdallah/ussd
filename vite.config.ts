import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    base: '/ussd/',

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

    start_url: './',
scope: './',

    icons: [
  {
    src: './icon-192.png',
    sizes: '192x192',
    type: 'image/png',
    purpose: 'any',
  },
  {
    src: './icon-512.png',
    sizes: '512x512',
    type: 'image/png',
    purpose: 'any maskable',
  },
],
  },
}),
