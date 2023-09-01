import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { ArrowLeft } from "react-native-feather";
import { TouchableOpacity } from "react-native-gesture-handler";

export const WithHeaderNavigation = <T extends object>(
  WrappedComponent: React.ComponentType<T>,
  options?: {
    HeaderAppend?: React.ComponentType<any>;
    ContentPrepend?: React.ComponentType<any>;
  }
) => {
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

          {options?.HeaderAppend && <options.HeaderAppend {...props} />}
        </View>

        {options?.ContentPrepend && <options.ContentPrepend {...props} />}
        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, paddingTop: 20 },
  header: { height: 48, paddingHorizontal: 16, alignItems: "center", flexDirection: "row", gap: 10 },
});
