import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";

export const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: { marginTop: 3, height: 1, backgroundColor: AppStyles.color.lightGray },
});
