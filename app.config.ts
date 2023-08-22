import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
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
  android: { adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#ffffff" } },
  experiments: { tsconfigPaths: true },
  plugins: [["expo-updates", { username: "loliveirawebdev" }]],
};

export default config;
