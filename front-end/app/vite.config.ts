// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react-swc';
// import tsconfigPaths from 'vite-tsconfig-paths';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tsconfigPaths()
//   ],
// })

import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
 
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000
  }
})