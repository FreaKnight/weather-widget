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
            remotes: {},
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
