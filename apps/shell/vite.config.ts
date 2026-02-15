import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    root: './',
    base: '/',
    plugins: [
        react(),
        federation({
            name: 'shell',
            remotes: {
                weather_search: 'http://localhost:5001/remoteEntry.js',
                weather_display: 'http://localhost:5002/remoteEntry.js'
            },
            shared: ['react', 'react-dom']
        })
    ],
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false
    }
});
