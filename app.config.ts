import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  owner: "boanerg3s",
  name: "bible-memo-app",
  slug: "bible-memo-app",
  scheme: "bible-memo-app",
  version: "0.0.1",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#ffffff" },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    infoPlist: {
      NSMicrophoneUsageDescription: "This app uses the microphone to check if you have memorizade a bible verse",
    },
  },
  android: {
    package: "app.biblememo",
    adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#ffffff" },
    permissions: ["android.permission.RECORD_AUDIO"],
  },
  experiments: { tsconfigPaths: true },
  plugins: [
    ["expo-updates", { username: "loliveirawebdev" }],
    [
      "@react-native-voice/voice",
      {
        microphonePermission: "Allow $(PRODUCT_NAME) to access your microphone.",
        speechRecognitionPermission: "Allow $(PRODUCT_NAME) to access your microphone.",
      },
    ],
  ],
  extra: { eas: { projectId: "482e8143-154a-4df4-b62e-9f0b58836563" } },
  updates: { url: "https://u.expo.dev/482e8143-154a-4df4-b62e-9f0b58836563" },
  runtimeVersion: { policy: "appVersion" },
};

export default config;
