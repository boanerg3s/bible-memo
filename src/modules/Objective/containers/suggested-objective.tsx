import { View, StyleSheet } from "react-native";
import { useSuggestedObjective } from "@/modules/Objective/hooks/lists";
import { ObjectiveCard } from "@/modules/Objective/components/objective-card";

export const SuggestedObjective: React.FC = () => {
  const objective = useSuggestedObjective();

  return (
    <View style={styles.container}>
      <ObjectiveCard objective={objective} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 20 },
});
