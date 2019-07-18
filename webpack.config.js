var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),  //入口，表示用webpack打包哪个文件
  output: {  //输出文件相关配置
    path: path.join(__dirname, './dist'),  //指定 打包好的文件，输出到哪个目录中去
    filename: 'bundle.js', //这是指定输出的文件名
  },
  plugins: [  //配置插件的节点
    new htmlWebpackPlugin({   //创建一个在内存中生成html的插件
      template: path.join(__dirname, './src/index.html'), //指定 模板页面，根据这个指定路径去内存中生成页面
      filename: 'index.html'  //指定生成的页面的名称
    }),
    new VueLoaderPlugin(),
  ],
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },  //处理.css 文件的loader
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
      { test: /\.vue$/, use: 'vue-loader' },  //处理.vue文件的loader
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 12000
        }
      },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader'] },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: ['url-loader'] },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: ['url-loader']
      },
      { test: /\.js/, use: 'babel-loader', exclude: /node_modules/ }

    ]
  },
  // resolve: {
  //   alias: {  //设置 Vue 被导入时的包的路径
  //     // "vue$": "vue/dist/vue.js"
  //   },
  // }
}