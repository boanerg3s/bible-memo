import { StyleSheet, Text, View } from "react-native";
import { useTrainingList } from "@/modules/Training/hooks/lists";
import { TrainingCard } from "@/modules/Training/components/training-card";

export const TrainingList: React.FC = () => {
  const definitions = useTrainingList();
  const keys = Object.keys(definitions) as App.Training[];

  return (
    <View style={styles.container}>
      {keys.map((key) => (
        <TrainingCard
          key={key}
          trainingKey={key}
          icon={definitions[key].icon}
          title={definitions[key].title}
          description={definitions[key].description}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", gap: 10, marginTop: 10 },
});
