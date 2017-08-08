module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],
    output: {
        path: __dirname + '/dist',
        filename: "index_bundle.js"
    }
}