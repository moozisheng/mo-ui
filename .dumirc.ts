import { defineConfig } from 'dumi';
import fs from 'fs'

// 通过静态文件的方式引入 pdf.worker.js 文件
// const pdfScriptStr = fs.readFileSync(require.resolve('./scripts/pdf.worker.js'), 'utf-8')
// 通过为外部的方式引入 pdf.worker.js 文件
const pdfScriptStr = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.js`;

const base = '/mozi-ui'
const logoPath = base + '/mo.png'

export default defineConfig({
  // outputPath: 'docs-dist',

  base,
  publicPath: '/mozi-ui/',

  apiParser: {},

  headScripts: [pdfScriptStr],

  themeConfig: {
    hd: { rules: [] },
    rtl: true,
    name: 'MO-UI',
    nav: [
      {
        title: '组件',
        link: '/components/copy-text',
      },
      // {
      //   title: '其它',
      //   link: '/components/copy-text',
      // },
    ],
    logo: logoPath,
    // footer: 'moozi | Copyright © 2023-present',
    footer: '<div></div>',
    prefersColor: { default: 'light', switch: true },
    socialLinks: {
      github: 'https://github.com/moozisheng/',
      yuque: 'https://www.yuque.com/moozi/umgbyh'
    },
  },
  favicons: [logoPath],
  theme: {
    '@c-primary': '#20b2aa',
    'primary-color': '#20b2aa',
    // '@s-sidebar-width': 'auto'
  },

  // unocss 配置
  plugins: [require.resolve('@umijs/plugins/dist/unocss')],
  unocss: {
    // 检测 className 的文件范围，若项目不包含 src 目录，可使用 `pages/**/*.tsx`
    watch: ['src/**/*.tsx', 'src/**/**/*.tsx']
  },

  resolve: {
    atomDirs: [
      { type: 'component', dir: 'src/components' },
      { type: 'component', dir: 'src/hooks' },
      { type: 'component', dir: 'src' }
    ],

    entryFile: './src/index.ts',
  }
});
