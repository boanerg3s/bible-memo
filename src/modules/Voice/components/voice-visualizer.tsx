import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
type VoiceVisualizerProps = { factor: number; size?: number };

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = (props) => {
  const { factor, size = 8 } = props;

  const calculateHeight = (type: "small" | "large") => {
    if (type == "large") return size + factor;

    const reducedFactor = Math.ceil(factor * 0.2);
    return size + reducedFactor;
  };

  const styles = StyleSheet.create({
    container: { flexDirection: "row", gap: 2, alignItems: "center", justifyContent: "center" },
    small: { width: 5, borderRadius: 5, height: calculateHeight("small"), backgroundColor: AppStyles.color.gray },
    large: { width: 5, borderRadius: 5, height: calculateHeight("large"), backgroundColor: AppStyles.color.gray },
  });

  return (
    <View style={styles.container}>
      <View style={styles.small} />
      <View style={styles.large} />
      <View style={styles.small} />
    </View>
  );
};
