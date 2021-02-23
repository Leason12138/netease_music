const webpack = require("webpack");
module.exports = {
    pluginOptions: new webpack.ProvidePlugin({
        jQuery: "jquery",
        $: "jquery"
    }),
    publicPath: './'
};