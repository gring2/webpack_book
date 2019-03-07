const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        open: true,
        overlay: true,
    },
});

exports.loadCSS = ({ include, exclude} = {} ) => ({
    module: {
        rules: [
            {
                test: /.css$/,
                include,
                exclude,
                use: [
                        {
                            loader: 'style-loader',
                            options: {
                            }
                        },
                        {
                            loader:  'css-loader',
                            options: {
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
            }
        ]
    }
});

// noinspection JSAnnotator
exports.extractCSS = ({ include, exclude, use = [] }) => {
    const plugin = new MiniCssExtractPlugin({
        filename: '[name].css'
    })

    return {
        module: {
            rules: [
                {
                    test : /.css$/,
                    include,
                    exclude,

                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader

                        }

                    ].concat(use)
                }
            ]
        },
        plugins: [plugin]
    }
};

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin(({ paths }))]
});

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});