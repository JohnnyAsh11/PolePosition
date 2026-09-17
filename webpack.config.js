module.exports = {
  mode: 'development',
  entry: ['./src/main.ts'],
  output: {
    filename: './bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
          },
        },
      },
    ],
  }
};