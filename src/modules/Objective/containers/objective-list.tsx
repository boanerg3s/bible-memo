import { View, StyleSheet } from "react-native";
import { useObjectiveList } from "@/modules/Objective/hooks/lists";
import { ObjectiveCard } from "@/modules/Objective/components/objective-card";

export const ObjectiveList: React.FC = () => {
  const objectives = useObjectiveList();

  return (
    <View style={styles.container}>
      {objectives.map((objective) => (
        <ObjectiveCard key={objective.id} objective={objective} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20 },
});
