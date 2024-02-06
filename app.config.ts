import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  owner: "loliveirawebdev95",
  name: "Biblegram",
  slug: "biblegram",
  scheme: "biblegram.app",
  version: "0.0.2",
  orientation: "portrait",
  notification: { color: "#00ddb3", icon: "./assets/notification-icon.png" },
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: { image: "./assets/splash.png", resizeMode: "contain", backgroundColor: "#ffffff" },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
    bundleIdentifier: "biblegram.app",
    infoPlist: { NSMicrophoneUsageDescription: "Utilizamos o microfone para checar se um verso foi memorizado." },
  },
  android: {
    package: "biblegram.app",
    adaptiveIcon: { foregroundImage: "./assets/adaptive-icon.png", backgroundColor: "#ffffff" },
    permissions: ["android.permission.RECORD_AUDIO"],
  },
  experiments: { tsconfigPaths: true },
  plugins: [
    ["expo-localization"],
    [
      "expo-notifications",
      { color: "#00ddb3", icon: "./assets/notification-icon.png", sounds: ["./src/assets/notify.wav"] },
    ],
    [
      "@react-native-voice/voice",
      {
        microphonePermission: "$(PRODUCT_NAME) acessa seu microfone.",
        speechRecognitionPermission: "$(PRODUCT_NAME) acessa seu microfone.",
      },
    ],
  ],
  extra: { eas: { projectId: "d36efb4d-29a6-4cb6-baea-53c02f1d9991" } },
  updates: { url: "https://u.expo.dev/482e8143-154a-4df4-b62e-9f0b58836563" },
  runtimeVersion: { policy: "appVersion" },
};

export default config;
