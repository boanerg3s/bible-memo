import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
type VoiceVisualizerProps = { factor: number; size?: number };

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = (props) => {
  const { factor, size = 8 } = props;

  const calculateHeight = (type: "small" | "large") => {
    if (type == "large") return size + factor;

    const reducedFactor = Math.ceil(factor * 0.2);
    return size + reducedFactor;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: moderateScale(2),
      alignItems: "center",
      justifyContent: "center",
    },
    small: {
      width: scale(5),
      borderRadius: scale(5),
      height: verticalScale(calculateHeight("small")),
      backgroundColor: AppStyles.color.gray,
    },
    large: {
      width: scale(5),
      borderRadius: scale(5),
      height: verticalScale(calculateHeight("large")),
      backgroundColor: AppStyles.color.gray,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.small} />
      <View style={styles.large} />
      <View style={styles.small} />
    </View>
  );
};
