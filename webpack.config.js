const Webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');
const argv = require('yargs').argv;
const isDev = argv.mode === 'development';
const isProd = !isDev;

module.exports = {
    entry: {
        index: './src/imports/index.js',
        white: './src/imports/white.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].html'
                    }
                }
            },

            { 
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /node_modules/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            publicPath: './dist/css',
                            url: false,
                            minimize: true
                        }
                    },

                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                isProd ? cssnano : () => {},
                                autoprefixer({
                                    browsers: ['ie >=11', 'last 4 versions']
                                })
                            ]
                        }
                    },
                    'sass-loader'
                ]
            },

            {
                test: /\.woff|woff2$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }
            },

            {
                test: /\.jpg|png|svg|gif|ico$/,
                use: 
                {
                    loader: 'file-loader',
                    options: {
                        name: 'img/[name].[ext]'
                    },
                }
            }
        ]
    },

    plugins: [
        new Webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[id].css' 
        }),
        new Webpack.HotModuleReplacementPlugin()
    ],

    optimization: isProd ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        warnings: false,
                        drop_console: true,
                        unsafe: true
                    },
                },
            }),
        ], 
    } : {},

    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        host: 'localhost',
        port: 9000,
        compress: true,
        open: true,
        hot: true
    }
};