module.exports = {
    plugins: [
        require('postcss-fixes'),
        require('oldie'),
        require('postcss-clip-path-polyfill'),
        require('autoprefixer'),
        require('cssnano'),
        require('postcss-font-awesome')
    ]
};