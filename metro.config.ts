import { getDefaultConfig } from "expo/metro-config";

const config = getDefaultConfig(__dirname);
const defaultSourceExts = config.resolver?.sourceExts || [];
const extendedSourceExts = ["jsx", "js", "ts", "tsx", "json", "svg", "d.ts", "mjs"];

module.exports = {
  ...config,
  resolver: {
    ...config.resolver,
    sourceExts: [...defaultSourceExts, ...extendedSourceExts],
  },
};
