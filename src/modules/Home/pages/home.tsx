import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ObjectiveList } from "@/modules/Objective/containers/objective-list";
import { ObjectiveListHeader } from "@/modules/Home/components/objective-list-header";
import { ObjectiveListAction } from "@/modules/Home/components/objective-list-action";

export const HomePage: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.list}>
        <ObjectiveListHeader />
        <ObjectiveList />
        <ObjectiveListAction />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: { padding: 20, gap: 20 },
});
