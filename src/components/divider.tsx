import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: { marginTop: moderateScale(3), height: 1, width: "100%", backgroundColor: AppStyles.color.lightGray },
});
