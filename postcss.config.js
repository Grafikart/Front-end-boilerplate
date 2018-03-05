module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 8']
    }),
    require('css-mqpacker')({
      sort: true
    })
  ]
}
