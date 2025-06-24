import {reactRouter} from '@react-router/dev/vite';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import jsonServer from 'vite-plugin-simple-json-server';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths(), jsonServer()],
  server: {
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router'],
  },
});
