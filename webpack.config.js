const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
  entry:  {
      popup: path.resolve('./src/index.jsx'), 
      background: path.resolve('./src/background/background.ts'),
      contentScript: path.resolve('./src/scripts/content.ts')
    },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/'),
    },
    extensions: ['.jsx', '.css', '.ts', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode: "production",
  module: {
    rules: [
        { 
            test: /\.jsx|js$/, 
            use: {
                loader: "babel-loader",
                options: {
                    presets: [
                        '@babel/preset-env',
                        ['@babel/preset-react', {"runtime": "automatic"}]
                    ]
                }
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
            exclude: /node_modules/,
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        filename: "popup.html", 
        template: "./src/index.html",
    }),
    new CopyPlugin({
        patterns: [
          { 
            from: path.resolve("src"),
            to: path.resolve("dist")
        }
        ],
    }),
    
    // Add more instances of HtmlWebpackPlugin if you have other HTML files to generate
],
};