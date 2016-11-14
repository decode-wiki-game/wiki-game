module.exports = {
  entry: __dirname + '/public/js/app.js',
  output: {
    filename: __dirname + '/public/js/app-bundle.js'
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