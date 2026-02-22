import pkg from './package.json';

export const sharedConfig = {
    react: {
        singleton: true,
        eager: true,
        requiredVersion: pkg.dependencies.react
    },
    'react-dom': {
        singleton: true,
        eager: true,
        requiredVersion: pkg.dependencies['react-dom']
    },
    '@weather/storage': {
        singleton: true
    },
    '@weather/ui': {
        singleton: true
    }
};
