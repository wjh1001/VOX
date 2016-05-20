import path from 'path';
import webpack from 'webpack';
import webpackConfig from './webpack.config.dev';

const testPath = path.join(__dirname, 'test');
const srcPath = path.join(__dirname, 'app');

module.exports = (config) => {
    config.set({
        frameworks: [ 'mocha', 'intl-shim', 'chai-immutable', 'sinon-chai' ],
        files: [
            'test/helpers/setup.js',
            'test/spec/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': [ 'webpack', 'electron' ]
        },
        webpack: {
            resolve: webpackConfig.resolve,
            plugins: webpackConfig.plugins,
            module: {
                noParse: webpackConfig.module.noParse,
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        include: [ srcPath, testPath ]
                    },
                    {
                        test: /\.styl$/,
                        loader: 'style!css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'
                    }
                ]
            },
            externals: {
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            target: webpackConfig.target
        },
        webpackMiddleware: {
            noInfo: true
        },
        reporters: [ 'progress' ],
        browsers: [ 'Electron' ],
        singleRun: false
    });
};
