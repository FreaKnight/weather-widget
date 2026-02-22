import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { sharedConfig } from '../../federation';

export default defineConfig({
    server: {
        port: 5000
    },
    plugins: [
        react(),
        federation({
            name: 'shell',
            remotes: {
                weather_search: {
                    type: 'module',
                    name: 'weather_search',
                    entry: 'http://localhost:5001/remoteEntry.js'
                },
                weather_display: {
                    type: 'module',
                    name: 'weather_display',
                    entry: 'http://localhost:5002/remoteEntry.js'
                }
            },
            shared: sharedConfig,
            dev: true,
            shareStrategy: 'loaded-first'
        })
    ]
});
