import React from "react";
import { AppStyles } from "@/styles";
import { router } from "expo-router";
import { useLocale } from "@/hooks/locale";
import { Info } from "react-native-feather";
import { Button } from "@/components/button";
import { StyleSheet, Text, View } from "react-native";
import { useScoreInfo } from "@/modules/Score/hooks/score";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import BottomDrawer, { BottomDrawerMethods } from "react-native-animated-bottom-drawer";

interface Props {
  score: number;
  objectiveId: number;
}

export const ScoreBar: React.FC<Props> = (props) => {
  const { scoreNumber } = useScoreInfo(props.score);
  const { t } = useLocale("objective.components.score-bar");
  const action = () => router.push({ pathname: "/evaluate", params: { objectiveId: props.objectiveId } });
  const bottomDrawerRef = React.useRef<BottomDrawerMethods>(null);
  const scoreHelper = () => bottomDrawerRef.current?.open();

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <Text style={styles.caption}>{t("your-score")}:</Text>
        <TouchableOpacity
          onPress={scoreHelper}
          style={{ flexDirection: "row", alignItems: "center", gap: moderateScale(6) }}
        >
          <Text style={styles.score}>{scoreNumber}</Text>
          <Info width={scale(16)} stroke={AppStyles.color.gray} strokeWidth={scale(3)} />
        </TouchableOpacity>
      </View>

      <Button grow={false} rounded size="small" action={action}>
        {t("action")}
      </Button>

      <BottomDrawer ref={bottomDrawerRef} initialHeight={verticalScale(340)}>
        <View style={{ padding: moderateScale(20), gap: moderateScale(20) }}>
          <Text style={styles.about}>{t("about")}</Text>
        </View>
      </BottomDrawer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: moderateScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barContainer: {
    gap: moderateScale(5),
    flex: 1,
    flexDirection: "column",
  },
  score: {
    fontSize: AppStyles.fontSize["2xl"],
    color: AppStyles.color.black,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  caption: {
    fontSize: AppStyles.fontSize.xs,
    color: AppStyles.color.gray,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  about: {
    fontSize: AppStyles.fontSize.base,
    color: AppStyles.color.black,
    lineHeight: verticalScale(25),
  },
});
