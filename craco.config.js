const CracoLessPlugin = require('craco-less');

const path = require('path')

const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
  webpack: {
  // 别名配置
    alias: {
      src: pathResolve('src'),
      asserts: pathResolve('src/assets'),
      common: pathResolve('src/common'),
      components: pathResolve('src/components'),
      pages: pathResolve('src/pages'),
      model: pathResolve('src/model'),
      util: pathResolve('src/util'),
      service: pathResolve('src/service'),
      layout: pathResolve('src/layout')
    },
  },
  // 装饰器
  babel: {
    plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // antd 主色
            modifyVars: { 
              '@primary-color': '#1DA57A'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  //开发服务器
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }
  }
}