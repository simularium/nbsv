var path = require("path");
var version = require("./package.json").version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
var rules = [
    { test: /\.ts$/, loader: 'ts-loader' },
    {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
    },
    {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
    },
    {
        test: /\.scss$/,
        use: [
            "style-loader",
            {
                loader: "css-loader",
                options: {
                    sourceMap: true,
                },
            },
            "resolve-url-loader",
            {
                loader: "sass-loader",
                options: {
                    sourceMap: true,
                    //          includePaths: [`${__dirname}/src/aics-image-viewer/assets/styles`]
                },
            },
        ],
    },
    {
        test: /\.less$/,
        use: [
            "style-loader",
            "css-loader",
            {
                loader: "less-loader",
                options: {
                    lessOptions: { javascriptEnabled: true },
                },
            },
        ],
    },
];

// Packages that shouldn't be bundled but loaded at runtime
const externals = ['@jupyter-widgets/base'];

const resolve = {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".ts", ".js", '.tsx', 'jsx']
};

module.exports = [
    {
        // Notebook extension
        //
        // This bundle only contains the part of the JavaScript that is run on
        // load of the notebook. This section generally only performs
        // some configuration for requirejs, and provides the legacy
        // "load_ipython_extension" function which is required for any notebook
        // extension.
        //
        entry: "./lib/extension.js",
        output: {
            filename: "extension.js",
            path: path.resolve(__dirname, "../share/jupyter/nbextensions/nbsv"),
            library: {
                type: "amd",
            },
        },
    },
    {
        // Bundle for the notebook containing the custom widget views and models
        //
        // This bundle contains the implementation for the custom widget views and
        // custom widget.
        // It must be an amd module
        //
        entry: "./lib/index.js",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "../share/jupyter/nbextensions/nbsv"),
            library: {
                type: "umd",
            },
            publicPath: "/nbextensions/nbsv/",
        },
        devtool: "source-map",
        module: {
            rules: rules,
        },
        externals,
        resolve
    },
    {
        // Embeddable nbsv bundle
        //
        // This bundle is generally almost identical to the notebook bundle
        // containing the custom widget views and models.
        //
        // The only difference is in the configuration of the webpack public path
        // for the static assets.
        //
        // It will be automatically distributed by unpkg to work with the static
        // widget embedder.
        //
        // The target bundle is always `dist/index.js`, which is the path required
        // by the custom widget embedder.
        //
        entry: "./src/index.ts",
        output: {
            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            library: {
                name: "nbsv",
                type: "umd",
            },
            publicPath: "https://unpkg.com/nbsv@" + version + "/dist/",
        },
        devtool: "source-map",
        module: {
            rules: rules,
        },
        externals,
        resolve
    },
];