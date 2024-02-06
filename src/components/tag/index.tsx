import React from "react";
import { AppStyles } from "@/styles";
import { TagProps } from "@/components/tag/interface";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const Tag = (props: TagProps) => {
  const { children, color = "primary" } = props;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    innerContainer: {
      display: "flex",
      borderRadius: scale(26),
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: moderateScale(10),
      justifyContent: "center",
      height: verticalScale(26),
      backgroundColor: AppStyles.color[color],
    },
    label: {
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: AppStyles.fontSize.xs,
      color:
        color === "white"
          ? AppStyles.color.primary
          : color === "lightGray"
          ? AppStyles.color.gray
          : AppStyles.color.white,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.label}>{children}</Text>
      </View>
    </View>
  );
};
