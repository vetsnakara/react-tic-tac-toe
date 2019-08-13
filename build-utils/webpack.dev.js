const Dotenv = require("dotenv-webpack");
const { HotModuleReplacementPlugin } = require("webpack");

module.exports = {
  mode: "development",

  devtool: "evel-source-map",

  plugins: [
    new HotModuleReplacementPlugin(),
    new Dotenv({
      path: "./.env.development"
    })
  ],

  devServer: {
    contentBase: "./dist",
    hot: true,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:3000"
    }
  }
};
