import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  appType: 'custom',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'build',
    emptyOutDir: false,
    rollupOptions: {
      input: process.env.VITE_ENTRY,
      output: {
        entryFileNames: '[name].js',
        inlineDynamicImports: true,
      },
    },
  },
})
