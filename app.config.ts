import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  owner: "boanerg3s",
  name: "bible-memo-app",
  slug: "bible-memo-app",
  scheme: "bible-memo-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#ffffff" },
  assetBundlePatterns: ["**/*"],
  ios: { supportsTablet: true },
  android: {
    package: "app.biblememo",
    adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#ffffff" },
  },
  experiments: { tsconfigPaths: true },
  plugins: [["expo-updates", { username: "loliveirawebdev" }]],
  extra: { eas: { projectId: "482e8143-154a-4df4-b62e-9f0b58836563" } },
};

export default config;
