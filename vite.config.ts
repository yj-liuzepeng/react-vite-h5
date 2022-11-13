/*
 * @Author: lzp
 * @Date: 2022-11-06 22:06:35
 * @Description: file content
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { createStyleImportPlugin,ElementPlusResolve } from 'vite-plugin-style-import'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // src 路径
      'utils': path.resolve(__dirname, 'src/utils') // src 路径
    }
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves:[
        ElementPlusResolve
      ],
      libs:[{
        libraryName:'zarm',
        esModule:true,
        resolveStyle:(name)=> {
          return `zarm/es/${name}/style/css`
        }
      }]
    })
  ],
  css: {
    modules: {
      localsConvention: 'dashesOnly'
    },
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        // target: 'http://api.chennick.wang/api/',
        target: 'http://127.0.0.1:7001/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '') // 将 /api 重写为空
      }
    }
  }
})
