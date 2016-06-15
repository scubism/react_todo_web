var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * This is the Webpack configuration file for production.
 */
module.exports = {
  entry: "./src/main",

  output: {
    path: __dirname + "/build/",
    filename: "app.js"
  },

  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),

    // set global vars
    new webpack.DefinePlugin({
      "process.env": {

        // Mainly used to require CSS files with webpack, which can happen only on browser
        // Used as `if (process.env.BROWSER)...`
        BROWSER: JSON.stringify(true),

        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify("production"),

        "TODO_API_ENDPOINT": JSON.stringify(process.env.TODO_API_ENDPOINT)

      }
    })
  ],

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader') }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },

  postcss: [
    require('autoprefixer'),
    require('postcss-nested')
  ]
}
