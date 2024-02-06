import { router } from "expo-router";
import { AppStyles } from "@/styles";
import Entypo from "@expo/vector-icons/Entypo";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale, verticalScale } from "react-native-size-matters";

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
            <Entypo color={AppStyles.color.gray} size={moderateScale(36)} name="chevron-small-left" />
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
  safeArea: { flex: 1, paddingTop: moderateScale(20) },
  header: {
    height: verticalScale(48),
    paddingLeft: moderateScale(8),
    paddingRight: moderateScale(16),
    alignItems: "center",
    flexDirection: "row",
    gap: moderateScale(10),
  },
});
