const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: {
        // Display only errors to reduce the amount of output.
        stats: "errors-only",


        overlay: true,
        // Parse host and port from env to allow customization.
        //
        // If you use Docker, Vagrant or Cloud9, set
        // host: "0.0.0.0";
        //
        // 0.0.0.0 is available to all network devices
        // unlike default `localhost`.
        host: "0.0.0.0", // Defaults to `localhost`
        port: process.env.PORT, // Defaults to 8080
        open: true, // Open the page in browser
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack demo",
        }),
    ],
};