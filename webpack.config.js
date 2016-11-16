module.exports = {
  entry: __dirname + '/app/assets/js/app.js',
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