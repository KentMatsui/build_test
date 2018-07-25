var glob = require("glob"),
    entries = glob.sync("./asset/src/js/*.js"),
    path = require('path'),
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    entry: entries, //ビルドするファイル
    output: {
      path: __dirname +'/asset/js', //ビルドしたファイルを吐き出す場所
      filename: 'app.js' //ビルドした後のファイル名
    },
    module: {
      rules: [
        {
          test: /\.js$/, //ビルド対象のファイルを指定
          loader: 'babel-loader', //loaderを指定
          exclude: /node_modules/, //ビルド対象に除外するファイルを指定
          query: //loaderに渡したいクエリパラメータを指定します
          {
            presets: ['es2015','stage-0']
          }
        }
      ]
    }
  },
  {
    context: path.join(__dirname, 'asset/src/sass'),
    entry: {
      style: './style.scss'
    },
    output: {
      path: path.join(__dirname, 'asset/css'),
      filename: '[name].css'
    },
    module: {
      rules: [
        {
          test: /\.(scss|sass)$/i,
          loader: ExtractTextPlugin.extract(
            {
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    url: true,
                    minimize: true,
                    sourceMap: true
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: (loader) => [
                      require('autoprefixer')()
                    ],
                    sourceMap: true
                  }
                },
                {
                  loader: 'sass-loader',
                  options: {
                    outputStyle: 'compressed',
                    sourceMap: true
                  }
                }
              ]
            }
          )
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
]
