    module.exports = {
        context: __dirname + "/app",
        entry: "./gcc.js",
        devtool: 'inline-source-map',
        output: {
            filename: "bundle.js",
            path: "./dist/"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        }
        

    };
