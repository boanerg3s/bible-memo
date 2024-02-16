const BG = "white";
import React from "react";
import { AppStyles } from "@/styles";
import { Stack } from "expo-router/stack";
import { usePathname } from "expo-router";
import Toast from "react-native-toast-message";
import { SafeAreaView, StatusBar } from "react-native";
import { useIsRingingSync } from "@/hooks/notification";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { AlarmPopup } from "@/modules/Alarm/components/alarm-popup";

export default function AppLayout() {
  const pathname = usePathname();
  useIsRingingSync();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG, marginTop: StatusBar.currentHeight }}>
      <ExpoStatusBar backgroundColor={AppStyles.color.lightGray} />

      <Stack initialRouteName="index" screenOptions={{ headerShown: false, contentStyle: { backgroundColor: BG } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>

      <Toast />
      {pathname !== "" && pathname !== "/" && <AlarmPopup />}
    </SafeAreaView>
  );
}
