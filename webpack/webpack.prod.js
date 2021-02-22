const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfiguration = require("./webpack.common.js");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
});
