const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outputPath = path.resolve(__dirname, "../dist");

const config = merge(...commonConfig, {
   mode: "development",
   watch: true,
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
      new MiniCssExtractPlugin({ filename: "[name].css" })
   ],
   output: {
      path: outputPath,
      filename: "[name].js"
   }
});
module.exports = config
