import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Info } from "react-native-feather";
import { Button } from "@/components/button";
import { useObjective } from "@/hooks/objective";
import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import BottomDrawer, { BottomDrawerMethods } from "react-native-animated-bottom-drawer";

export const TrainingHeaderAppend: React.FC = () => {
  const params = useLocalSearchParams();
  const objective = useObjective(Number(params.objectiveId));
  const bottomDrawerRef = React.useRef<BottomDrawerMethods>(null);
  const openDrawer = () => bottomDrawerRef.current?.open();

  const { t } = useLocale("training");
  const { t: tBible } = useLocale("bible.label");
  const { book, chapter, verseFrom, verseTo, version } = objective.passage;
  const title = `${tBible(book)} ${chapter}:${verseFrom}-${verseTo} (${version})`;

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
      <Text style={styles.headerSeparator}>•</Text>

      <TouchableOpacity onPress={openDrawer} style={styles.trainingKeyContainer}>
        <Text style={styles.headerMode} numberOfLines={1} ellipsizeMode="tail">
          {t(`title.${params.trainingKey}`)}
        </Text>

        <Info width={scale(16)} stroke={AppStyles.color.gray} strokeWidth={scale(3)} />
      </TouchableOpacity>

      <BottomDrawer ref={bottomDrawerRef}>
        <View style={{ padding: moderateScale(20), gap: moderateScale(20) }}>
          <Text style={styles.tip}>{t(`tip.${params.trainingKey}`)}</Text>
        </View>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: { flexDirection: "row", gap: moderateScale(10), alignItems: "center" },
  trainingKeyContainer: { flexDirection: "row", gap: moderateScale(10), alignItems: "center" },
  headerTitle: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.black, fontWeight: "bold" },
  headerSeparator: { color: AppStyles.color.gray },
  headerMode: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold", maxWidth: scale(80) },
  tip: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.black, lineHeight: verticalScale(25) },
});
