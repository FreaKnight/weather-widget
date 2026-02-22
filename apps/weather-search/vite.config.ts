import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
    envDir: '../../',
    plugins: [
        react(),
        federation({
            name: 'weather_search',
            filename: 'remoteEntry.js',
            exposes: {
                './SearchInput': './src/components/SearchInput.tsx'
            },
            shared: ['react', 'react-dom', '@weather/storage', '@weather/ui']
        })
    ],
    build: {
        target: 'esnext',
        assetsDir: '',
        minify: false
    }
});
