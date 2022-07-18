module.exports = {
    devServer: {
        hot: true,
        disableHostCheck: true,
        port: 8082,
        overlay: {
            warnings: false,
            errors: true,
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
};
