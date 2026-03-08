import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig(({ mode }) => {
  const isPlayground = mode === 'playground'

  return {
    base: isPlayground ? '/fireworks/' : './',
    root: isPlayground ? 'playground' : '.',
    plugins: [
      vue(),
      UnoCSS({
        mode: 'vue-scoped',
      }),
      cssInjectedByJsPlugin(),
      !isPlayground && dts({
        tsconfigPath: './tsconfig.json',
        rollupTypes: true,
      }),
    ].filter(Boolean),
    assetsInclude: ['**/*.glsl'],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: isPlayground ? {
      outDir: '../dist-play',
      emptyOutDir: true,
    } : {
      lib: {
        entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
        name: 'BgEffectsFireworks',
        formats: ['es', 'umd'],
        fileName: (format) => `index.${format === 'es' ? 'js' : 'umd.cjs'}`,
      },
      rollupOptions: {
        external: ['vue', 'ogl'],
        output: {
          globals: {
            vue: 'Vue',
            ogl: 'OGL',
          },
        },
      },
    },
    server: isPlayground ? {
      port: 5174,
      fs: {
        allow: ['..']
      }
    } : undefined
  }
})
