import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const WithHeaderNavigation = <T extends object>(WrappedComponent: React.ComponentType<T>) => {
  return (props: T) => {
    if (!router.canGoBack()) {
      return <WrappedComponent {...props} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Text>{"<-"}</Text>
          </TouchableOpacity>
        </View>

        <WrappedComponent {...props} />
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { height: 48, paddingHorizontal: 20, justifyContent: "center" },
});
