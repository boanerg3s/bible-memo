const BG = "white";
import { AppStyles } from "@/styles";
import { Stack } from "expo-router/stack";
import Toast from "react-native-toast-message";
import { SafeAreaView, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";

export default function AppLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG, marginTop: StatusBar.currentHeight }}>
      <ExpoStatusBar backgroundColor={AppStyles.color.lightGray} />

      <Stack initialRouteName="index" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: BG } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>

      <Toast />
    </SafeAreaView>
  );
}
