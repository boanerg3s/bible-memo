import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { useCardContent } from "@/modules/Objective/hooks/card";
import { FullPageLoading } from "@/components/full-page-loading";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { useSuggestedObjective } from "@/modules/Objective/hooks/lists";
import { predictBibleConfig } from "@/modules/Objective/helpers/add-object";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { VersionSelector } from "@/modules/Objective/components/version-selector";
import { LanguageSelector } from "@/modules/Objective/components/language-selector";

const AddSuggestedObjectivePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);

  const objective = useSuggestedObjective();
  const { t } = useLocale("objective.pages.add-suggested-objective");
  const { canContinue, continueAction, ...setters } = useAddObjectiveStore();
  const { setLanguage, setVersion, setBook, setChapter, setVerseFrom, setVerseTo } = setters;
  const { fetchPassageContent, content, isContentLoading } = useCardContent(objective.passage);

  const loadDefaultValues = async () => {
    const { language, version } = await predictBibleConfig();
    setBook(objective.passage.book);
    setChapter(objective.passage.chapter);
    setVerseFrom(objective.passage.verseFrom);
    setVerseTo(objective.passage.verseTo);
    setLanguage(language);
    version && setVersion(version);
    setIsLoaded(true);
  };

  React.useEffect(() => {
    loadDefaultValues();
    fetchPassageContent();
  }, []);

  if (!isLoaded || isContentLoading) {
    return <FullPageLoading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.innerContainer} nestedScrollEnabled={true}>
        <View style={styles.headerContainer}>
          <Text style={styles.headline}>{t("title")}:</Text>
          <Text style={styles.title}>Salmos 1:1</Text>

          <Text numberOfLines={3} style={styles.description}>
            {content}
          </Text>
        </View>

        <Divider />

        <Text style={styles.description}>{t("description")}:</Text>

        <LanguageSelector />
        <VersionSelector />
      </ScrollView>

      <Button disabled={!canContinue} action={continueAction}>
        {t("action")}
      </Button>
    </View>
  );
};

export const AddSuggestedObjective = WithHeaderNavigation(AddSuggestedObjectivePage);

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flexDirection: "column", gap: 10 },
  title: { fontSize: AppStyles.fontSize["2xl"], fontWeight: "bold" },
  headline: {
    fontSize: AppStyles.fontSize.sm,
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontWeight: "bold",
  },
  description: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray },
  innerContainer: { flexDirection: "column", gap: 20, paddingHorizontal: 20, paddingBottom: 20 },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
});
