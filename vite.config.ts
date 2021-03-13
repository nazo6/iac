import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [reactRefresh(), WindiCSS(), tsconfigPaths()],
});
