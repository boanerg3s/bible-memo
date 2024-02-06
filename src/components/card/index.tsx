import React from "react";
import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { scale } from "react-native-size-matters";
import { CardProps } from "@/components/card/interface";

export const Card = (props: CardProps) => {
  const { children, disabled } = props;

  const styles = StyleSheet.create({
    container: {
      elevation: 6,
      borderRadius: scale(12),
      zIndex: 999,
      shadowColor: "#000",
      backgroundColor: disabled ? AppStyles.color.lightGray : AppStyles.color.white,

      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.2,
    },
  });

  return <View style={styles.container}>{children}</View>;
};
