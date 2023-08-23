import React from "react";
import { AppStyles } from "@/styles";
import { TagProps } from "@/components/tag/interface";
import { StyleSheet, Text, View } from "react-native";

export const Tag = (props: TagProps) => {
  const { children, color = "blue" } = props;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    innerContainer: {
      height: 26,
      display: "flex",
      borderRadius: 26,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      justifyContent: "center",
      backgroundColor: AppStyles.color[color],
    },
    label: {
      fontWeight: "bold",
      textTransform: "uppercase",
      fontSize: AppStyles.fontSize.xs,
      color: color === "white" ? AppStyles.color.blue : AppStyles.color.white,
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
