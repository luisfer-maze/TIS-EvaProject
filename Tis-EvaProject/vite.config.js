import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react'; // Importa el plugin de React

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react(), // Añade el plugin de React
    ],
    esbuild: {
        loader: 'jsx', // Configura esbuild para reconocer JSX
    },
    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
