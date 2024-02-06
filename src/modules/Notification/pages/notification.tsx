import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Divider } from "@/components/divider";
import { moderateScale } from "react-native-size-matters";
import { FullPageLoading } from "@/components/full-page-loading";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DaySelectionContainer } from "../containers/day-selection";
import { TimeSelectionContainer } from "../containers/time-selection";
import { requestNotificationPermissions } from "@/services/notification";

export const NotificationPage = () => {
  const { t } = useLocale("notification.pages.notification");
  const [isFetchingNotificationPermission, setIsFetchingNotificationPermission] = React.useState(true);
  const [isNotificationWorking, setIsNotificationWorking] = React.useState(false);

  async function initialize() {
    setIsFetchingNotificationPermission(true);
    const result = await requestNotificationPermissions();
    setIsNotificationWorking(result.allowed);
    setIsFetchingNotificationPermission(false);
  }

  React.useEffect(() => {
    initialize();
  }, []);

  if (isFetchingNotificationPermission) {
    return <FullPageLoading />;
  }

  // todo
  if (!isNotificationWorking) {
    return <FullPageLoading />;
  }

  return (
    <ScrollView style={styles.scrollview} contentContainerStyle={styles.contentContainer}>
      <View style={{ gap: moderateScale(10) }}>
        <Text style={styles.title}>{t("title")}</Text>
        <Text style={styles.description}>{t("description")}</Text>
      </View>
      <Divider />
      <DaySelectionContainer />
      <Divider />
      <TimeSelectionContainer />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: { padding: moderateScale(20), gap: moderateScale(40) },
  scrollview: { backgroundColor: "white", flex: 1 },
  title: { fontSize: AppStyles.fontSize["2xl"], fontWeight: "bold" },
  description: { color: AppStyles.color.black, fontSize: AppStyles.fontSize.base },
});
