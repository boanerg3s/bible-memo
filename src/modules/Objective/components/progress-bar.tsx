import { AppStyles } from "@/styles";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";
import { useLocale } from "@/hooks/locale";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = (props) => {
  const { t } = useLocale("objective.components.progress-bar");

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Text style={styles.caption}>
          {t("your-progress")} <Text style={{ color: AppStyles.color.green }}>{props.percentage}%</Text>
        </Text>

        <View style={styles.bar}>
          <View style={[styles.progress, { width: `${props.percentage}%` }]} />
        </View>
      </View>

      <Button grow={false} rounded size="small" action={() => null}>
        {t("action")}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  barContainer: {
    gap: 5,
    flex: 1,
    flexDirection: "column",
  },
  bar: {
    height: 14,
    backgroundColor: AppStyles.color.black,
    borderRadius: 300,
  },
  progress: {
    height: 20,
    position: "absolute",
    backgroundColor: AppStyles.color.green,
    borderRadius: 300,
  },
  caption: {
    fontSize: AppStyles.fontSize.xs,
    color: AppStyles.color.gray,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
