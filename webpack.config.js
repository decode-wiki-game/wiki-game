module.exports = {
  entry: __dirname + '/src/js/app.js',
  output: {
    filename: __dirname + '/src/js/app-bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'sourcemap'
};