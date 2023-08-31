import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { reloadApplication } from "@/helpers/app";
import { cleanDatabase } from "@/services/database";
import { ScrollView, StyleSheet, View } from "react-native";
import { ObjectiveList } from "@/modules/Objective/containers/objective-list";
import { ObjectiveListHeader } from "@/modules/Home/components/objective-list-header";
import { ObjectiveListAction } from "@/modules/Home/components/objective-list-action";
import { SuggestedObjective } from "@/modules/Objective/containers/suggested-objective";
import { ObjectiveSuggestionHeader } from "@/modules/Home/components/objective-suggestion-header";

export const HomePage: React.FC = () => {
  const reset = async () => {
    await cleanDatabase();
    reloadApplication();
  };

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

      <View style={styles.list}>
        <Divider />
      </View>

      {__DEV__ && (
        <View style={styles.list}>
          <Button action={reset}>Reset Database</Button>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icons: { alignItems: "flex-end", padding: 20 },
  list: { padding: 20, gap: 20 },
});
