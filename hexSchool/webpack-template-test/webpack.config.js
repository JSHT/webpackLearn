const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let fs = require('fs');
const headerTemplate = fs.readFileSync(__dirname + '/src/template/header.html');
const footerTemplate = fs.readFileSync(__dirname + '/src/template/footer.html');

let htmlPages = ['index', 'second', 'third'];
let multipleHtmlPlugins = htmlPages.map((name) => {
  // 這邊的 header、footer 是自己加上去的 object 屬性，可以自由添加
  return new HtmlWebpackPlugin({
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    header: headerTemplate,
    footer: footerTemplate,
  });
});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // bundle or main more common
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // webpack css-loader using in official web
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          { loader: 'style-loader' },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [].concat(multipleHtmlPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    // contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    open: true, // 執行時自動開localhost頁面
  },
};
