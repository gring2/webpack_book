require('dotenv').config();
const glob = require("glob");
const path = require('path');

const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const parts = require('./webpack.parts');

const PATHS = {
    app: path.join(__dirname, 'src')
}

const commonConfig = merge([
    {
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack Demo'
            })
        ]
    },
]);

const productionConfig = merge([
    parts.extractCSS({
        use:
            [

                {
                    loader:  'css-loader',
                    options: {
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'sass-loader'
                },
                parts.autoprefix()
            ]
    }),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, {nodir: true})
    })
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT
    }),
    parts.loadCSS()
]);

module.exports = mode => {
    if ( mode === 'production' ) {
        return merge(commonConfig, productionConfig, { mode })
    }

    return merge(commonConfig, developmentConfig, { mode })
};

