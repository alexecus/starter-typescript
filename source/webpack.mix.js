const mix = require('laravel-mix');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

const plugins = [
    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [],
        cleanAfterEveryBuildPatterns: ['!index.html'],
    })
];

if (!mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'source-map'
    }).sourceMaps();

    plugins.push(
        new WebpackShellPlugin({
            onBuildEnd: ['yarn serve'],
        })
    );
}

mix.webpackConfig({
    plugins: plugins,
});

mix.ts('assets/script/app.ts', 'public/app.js');
mix.sass('assets/sass/app.scss', 'public/app.css');
mix.setPublicPath('public');
