import React from "react";
import { AppStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

interface SelectorHeaderProps {
  title: string;
  tags?: React.ReactElement | React.ReactElement[];
}

export const SelectorHeader = (props: SelectorHeaderProps) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{props.title}</Text>
        {props.tags}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: moderateScale(20),
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize.sm,
  },
  headerContent: {
    gap: moderateScale(10),
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  contentContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
});
