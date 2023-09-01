import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { Divider } from "@/components/divider";
import { FullPageLoading } from "@/components/full-page-loading";
import { WithHeaderNavigation } from "@/components/header-navigation";
import { BookSelector } from "@/modules/Objective/components/book-selector";
import { predictBibleConfig } from "@/modules/Objective/helpers/add-object";
import { useAddObjectiveStore } from "@/modules/Objective/stores/add-objective";
import { ChapterSelector } from "@/modules/Objective/components/chapter-selector";
import { VersionSelector } from "@/modules/Objective/components/version-selector";
import { VerseToSelector } from "@/modules/Objective/components/verse-to-selector";
import { LanguageSelector } from "@/modules/Objective/components/language-selector";
import { ActivityIndicator, View, Text, StyleSheet, ScrollView } from "react-native";
import { VerseFromSelector } from "@/modules/Objective/components/verse-from-selector";

const AddObjectivePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { t } = useLocale("objective.pages.add-objective");
  const { canContinue, continueAction, ...setters } = useAddObjectiveStore();
  const { setLanguage, setVersion, setBook, setChapter, setVerseFrom, setVerseTo } = setters;

  const loadDefaultValues = async () => {
    const { language, version } = await predictBibleConfig();
    setBook(undefined);
    setChapter(undefined);
    setVerseFrom(undefined);
    setVerseTo(undefined);
    setLanguage(language);
    version && setVersion(version);
    setIsLoaded(true);
  };

  React.useEffect(() => {
    loadDefaultValues();
  }, []);

  if (!isLoaded) {
    return <FullPageLoading />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.innerContainer} nestedScrollEnabled={true}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{t("title")}</Text>
          <Text style={styles.description}>{t("description")}</Text>
        </View>

        <BookSelector />
        <ChapterSelector />
        <VerseFromSelector />
        <VerseToSelector />
        <Divider />
        <LanguageSelector />
        <VersionSelector />
      </ScrollView>

      <Button disabled={!canContinue} action={continueAction}>
        {t("action")}
      </Button>
    </View>
  );
};

export const AddObjective = WithHeaderNavigation(AddObjectivePage);

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { flexDirection: "column", gap: 5 },
  title: { fontSize: AppStyles.fontSize["2xl"], fontWeight: "bold" },
  description: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.gray },
  innerContainer: { flexDirection: "column", gap: 20, paddingHorizontal: 20, paddingBottom: 20 },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
});
