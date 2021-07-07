const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const commonConfig = require('./common.js');

const config = merge(...commonConfig, {
   mode: "production",
   module: {
      rules: [
         {
            test: /\.(js)$/,
            exclude: [/dist/],
            include: path.resolve(__dirname, '../app'),
            use: { loader: "babel-loader" }
         },
         {
            test: /\.css$/,
            exclude: [/dist/],
            include: path.resolve(__dirname, '../app'),
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
         }
      ]
   },
   plugins: [
      new CleanWebpackPlugin(),
      new CssMinimizerPlugin(),
      new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })
   ],
   optimization: {
      minimize: true,
      minimizer: [new TerserPlugin({
         parallel: true,
         parallel: 4,
         extractComments: true
      })],
   },
   output: {
      path: path.resolve(__dirname, "../dist"),
      filename: function (file) {
         return file.chunk.name === 'server-bundle' ? "[name].js" : "[name].[contenthash].js";
      }
   }
});
module.exports = config
