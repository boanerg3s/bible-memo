import React from "react";
import { AppStyles } from "@/styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useInitialization } from "@/modules/Startup/hooks/initializator";

export function InitialPage() {
  useInitialization();

  return (
    <View style={styles.container}>
      <ActivityIndicator size={32} color={AppStyles.color.blue} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});
