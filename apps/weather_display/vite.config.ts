import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { sharedConfig } from '../../federation';

export default defineConfig({
    server: {
        port: 5002,
        cors: true,
        strictPort: true,
        origin: 'http://localhost:5002'
    },
    base: 'http://localhost:5002',
    plugins: [
        react(),
        federation({
            name: 'weather_display',
            filename: 'remoteEntry.js',
            exposes: {
                './WeatherCards': './src/components/WeatherCards.tsx'
            },
            shared: sharedConfig,
            dev: true,
            dts: false,
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
