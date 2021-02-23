const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const generateHtmlPlugin = (page) => {
  if (page === "index") {
    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `../src/pages/${page}.html`),
      filename: `${page}.html`,
      minify: true,
      chunks: [page]
    });  
  }
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, `../src/pages/${page}/${page}.html`),
    filename: `${page}.html`,
    minify: true,
    chunks: [page]
  });
}

const populateHtmlPlugins = (pagesArray) => {
  const res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  })
  return res;
}

const populateEntryPoints = (pagesArray) => {
  const res = {};
  pagesArray.forEach(page => {
    if (page === "index") {
      res[page] = path.resolve(__dirname, `../src/pages/${page}.ts`);
    } else {
      res[page] = path.resolve(__dirname, `../src/pages/${page}/${page}.ts`);
    }
  })
  return res;
}

const pages = ["index", "pingpong"];

module.exports = {
  entry: populateEntryPoints(pages),
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, "../src/assets") }],
    }),
    new MiniCSSExtractPlugin(),
    ...populateHtmlPlugins(pages)
  ],
  module: {
    rules: [
      // HTML
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },

      // TS
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      // CSS
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, "css-loader"],
      },

      // Images
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },

      // Fonts
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name].[ext]?[hash]',
            },
          },
        ],
      },

      // Shaders
      {
        test: /\.(glsl|vs|fs|vert|frag)$/,
        exclude: /node_modules/,
        use: ["raw-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  watchOptions: {
    ignored: "node_modules/**",
  },
};
