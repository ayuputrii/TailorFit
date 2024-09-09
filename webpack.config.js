const path = require('path');

module.exports = {
  entry: './src/index.js', // atau path ke file entry point dari proyek kamu
  output: {
    path: path.resolve(__dirname, 'dist'), // output directory
    filename: 'bundle.js', // nama file output
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // Rule lainnya...
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
