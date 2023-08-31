import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { Card } from "@/components/card";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TrainingCardProps {
  title: string;
  description: string;
  trainingKey: App.Training;
  icon?: React.ReactElement;
  objective?: App.Objective;
}

export const TrainingCard: React.FC<TrainingCardProps> = (props) => {
  const { trainingKey, title, description, icon, objective } = props;
  const cardAction = () => console.log("ok", trainingKey);

  return (
    <Card>
      <TouchableOpacity onPress={cardAction} style={styles.innerCard}>
        <View style={styles.horizontalContainer}>
          {icon}
          <Text style={styles.cardTitle}>{title}</Text>
        </View>

        <Text numberOfLines={3} style={styles.preview}>
          {description}
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  innerCard: { padding: 20, gap: 10 },
  preview: { color: AppStyles.color.gray },
  cardTitle: { fontSize: AppStyles.fontSize.base, fontWeight: "bold" },
  horizontalContainer: { flexDirection: "row", gap: 5, alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
