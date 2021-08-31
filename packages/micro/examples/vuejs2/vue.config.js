module.exports = {
    devServer: {
        hot: true,
        disableHostCheck: true,
        port: 8081,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
