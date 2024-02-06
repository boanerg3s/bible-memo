import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useTrainingList } from "@/modules/Training/hooks/lists";
import { TrainingCard } from "@/modules/Training/components/training-card";

interface TrainingListProps {
  objectiveId: number;
}

export const TrainingList: React.FC<TrainingListProps> = (props) => {
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
          objectiveId={props.objectiveId}
          description={definitions[key].description}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", gap: moderateScale(10), marginTop: moderateScale(10) },
});
