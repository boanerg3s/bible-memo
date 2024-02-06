import { router } from "expo-router";
import { AppStyles } from "@/styles";
import { Card } from "@/components/card";
import { moderateScale } from "react-native-size-matters";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TrainingCardProps {
  title: string;
  description: string;
  objectiveId: number;
  trainingKey: App.Training;
  icon?: React.ReactElement;
}

export const TrainingCard: React.FC<TrainingCardProps> = (props) => {
  const { trainingKey, title, description, icon, objectiveId } = props;
  const cardAction = () => router.push({ pathname: "/training", params: { trainingKey, objectiveId } });

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
  innerCard: { padding: moderateScale(20), gap: moderateScale(10) },
  preview: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray },
  cardTitle: { fontSize: AppStyles.fontSize.base, fontWeight: "bold" },
  horizontalContainer: { flexDirection: "row", gap: moderateScale(5), alignItems: "center" },
  cardTitleAppend: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray, fontWeight: "bold" },
});
