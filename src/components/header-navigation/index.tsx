import { router } from "expo-router";
import { ArrowLeft } from "react-native-feather";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AppStyles } from "@/styles";

export const WithHeaderNavigation = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return (props: T) => {
    if (!router.canGoBack()) {
      return (
        <View style={styles.safeArea}>
          <WrappedComponent {...props} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft stroke={AppStyles.color.gray} />
          </TouchableOpacity>
        </View>

        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingTop: 20 },
  header: { height: 48, paddingHorizontal: 16, justifyContent: "center" },
});
