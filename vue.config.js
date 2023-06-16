module.exports = {
    publicPath: './',
    outputDir: 'dist',
    lintOnSave: false,
    productionSourceMap: true,
    devServer: {
        port: 8080,
        open: true,
        https: false,
        overlay: {
            warnings: true,
            errors: true
        },
       // proxy: {}
    },
}