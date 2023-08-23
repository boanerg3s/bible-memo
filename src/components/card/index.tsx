import React from "react";
import { AppStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { CardProps } from "@/components/card/interface";

export const Card = (props: CardProps) => {
  const { children, disabled } = props;

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      elevation: 6,
      borderRadius: 12,
      shadowColor: "#000",
      backgroundColor: disabled ? AppStyles.color.lightGray : AppStyles.color.white,
    },
  });

  return <View style={styles.container}>{children}</View>;
};
