import { Logo } from "@/components/logo";
import { AppColors } from "@/styles/colors";
import { Divider } from "@/components/divider";
import { moderateScale } from "react-native-size-matters";
import { ScrollView, StyleSheet, View } from "react-native";
import { ObjectiveList } from "@/modules/Objective/containers/objective-list";
import { ObjectiveListHeader } from "@/modules/Home/components/objective-list-header";
import { ObjectiveListAction } from "@/modules/Home/components/objective-list-action";
import { SuggestedObjective } from "@/modules/Objective/containers/suggested-objective";
import { ObjectiveSuggestionHeader } from "@/modules/Home/components/objective-suggestion-header";

export const HomePage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo />
      </View>

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
  container: { backgroundColor: AppColors.white },
  icons: { alignItems: "flex-end", padding: moderateScale(20) },
  list: { padding: moderateScale(20), gap: moderateScale(20) },
  logoContainer: { paddingHorizontal: moderateScale(20), paddingTop: moderateScale(20) },
});
