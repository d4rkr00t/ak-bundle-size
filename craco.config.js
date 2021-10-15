const path = require("path");
const { when } = require("@craco/craco");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const timestamp = String(Date.now());
const reportPath = path.join(__dirname, "reports", timestamp);

module.exports = {
  webpack: {
    plugins: [
      ...when(
        Boolean(process.env.ANALYZE),
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
            reportFilename: path.join(reportPath, "report.html"),
            statsFilename: path.join(reportPath, "stats.json"),
          }),
        ],
        []
      ),
    ],
    stats: {
      source: false,
    },
    alias: {
      // "@atlaskit/media-editor": require.resolve("./src/empty-module.js"),
      // "@atlaskit/media-picker": require.resolve("./src/empty-module.js"),
      // "@atlaskit/media-viewer": require.resolve("./src/empty-module.js"),
      // "styled-components": require.resolve("./src/empty-module.js"),
      // "react-dom": require.resolve("./src/empty-module.js"),
      // react: require.resolve("./src/empty-module.js"),
      // "react/jsx-runtime": require.resolve("./src/empty-module.js"),
      // "react-intl": require.resolve("./src/empty-module.js"),
      // "@atlaskit/select": require.resolve("./src/empty-module.js"),
      // "lodash/debounce": require.resolve("./src/empty-module.js"),
      // "lodash/omitBy": require.resolve("./src/empty-module.js"),
      // "lodash/isUndefined": require.resolve("./src/empty-module.js"),
      // "@kenjiuno/msgreader": require.resolve("./src/empty-module.js"),
      // "@atlaskit/dropdown-menu": require.resolve("./src/empty-module.js"),
      // xstate: require.resolve("./src/empty-module.js"),
    },
  },
};
