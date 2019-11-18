const { when } = require("@craco/craco");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: {
    plugins: [
      ...when(
        Boolean(process.env.ANALYZE),
        () => [
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            generateStatsFile: true,
            statsFilename: "stats." + Date.now() + ".json"
          })
        ],
        []
      )
    ],
    stats: {
      source: false
    },
    alias: {
      "@atlaskit/media-editor": require.resolve("./src/empty-module.js"),
      // "@atlaskit/media-picker": require.resolve("./src/empty-module.js"),
      // "@atlaskit/media-viewer": require.resolve("./src/empty-module.js"),
      // "@atlaskit/select": require.resolve("./src/empty-module.js"),
      "styled-components": require.resolve("./src/empty-module.js"),
      "react-dom": require.resolve("./src/empty-module.js"),
      react: require.resolve("./src/empty-module.js")
    }
  }
};
