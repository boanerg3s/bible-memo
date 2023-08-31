import { Divider } from "@/components/divider";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ObjectiveList } from "@/modules/Objective/containers/objective-list";
import { ObjectiveListHeader } from "@/modules/Home/components/objective-list-header";
import { ObjectiveListAction } from "@/modules/Home/components/objective-list-action";
import { SuggestedObjective } from "@/modules/Objective/containers/suggested-objective";
import { ObjectiveSuggestionHeader } from "@/modules/Home/components/objective-suggestion-header";

export const HomePage: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.list}>
        <ObjectiveSuggestionHeader />
        <SuggestedObjective />
      </View>

      <View style={styles.list}>
        <Divider />
      </View>

      <View style={styles.list}>
        <ObjectiveListHeader />
        <ObjectiveList />
        <ObjectiveListAction />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icons: { alignItems: "flex-end", padding: 20 },
  list: { padding: 20, gap: 20 },
});
