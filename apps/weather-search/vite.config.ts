import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { resolve } from 'node:path';

export default defineConfig({
    base: '/',
    plugins: [
        react(),
        federation({
            name: 'weather_search',
            filename: 'remoteEntry.js',
            exposes: {
                './SearchInput': './src/components/SearchInput.tsx',
            },
            shared: ['react', 'react-dom', '@weather/storage']
        })
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        modulePreload: false,
        assetsDir: '',
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
    server: {
        port: 5001
    }
});
