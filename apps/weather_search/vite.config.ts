import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { sharedConfig } from '../../federation';

export default defineConfig({
    server: {
        port: 5001,
        cors: true,
        strictPort: true,
        origin: 'http://localhost:5001'
    },
    base: 'http://localhost:5001',
    plugins: [
        react(),
        federation({
            name: 'weather_search',
            filename: 'remoteEntry.js',
            exposes: {
                './SearchInput': './src/components/SearchInput.tsx'
            },
            shared: sharedConfig,
            dev: true,
            manifest: true,
            shareStrategy: 'loaded-first'
        })
    ],
    build: {
        minify: false,
        target: 'esnext',
        lib: false,
        outDir: 'dist'
    },
    optimizeDeps: {
        exclude: ['@module-federation/vite', '@module-federation/sdk']
    }
});
