import React from "react";
import { AppStyles } from "@/styles";
import { ButtonProps } from "@/components/button/interface";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Button = (props: ButtonProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { grow = true, rounded = false, size = "large", type = "primary" } = props;

  const onPress = async () => {
    setIsLoading(true);
    await props.action();
    setIsLoading(false);
  };

  const styles = StyleSheet.create({
    touchable: {
      display: "flex",
      flexDirection: "row",
    },
    container: {
      width: "auto",
      flex: grow ? 1 : 0,
      alignItems: "center",
      paddingHorizontal: 10,
      justifyContent: "center",
      borderRadius: rounded ? 48 : 0,
      height: size === "large" ? 48 : 36,
      backgroundColor: type === "primary" ? AppStyles.color.blue : AppStyles.color.gray,
    },
    label: {
      fontWeight: "bold",
      textTransform: "uppercase",
      opacity: isLoading ? 0 : 1,
      color: AppStyles.color.white,
      fontSize: size === "large" ? AppStyles.fontSize.lg : AppStyles.fontSize.xs,
    },
    loadingIndicator: {
      position: "absolute",
      opacity: isLoading ? 1 : 0,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.children}</Text>

        <ActivityIndicator
          color={AppStyles.color.white}
          style={styles.loadingIndicator}
          size={size === "large" ? 32 : 24}
        />
      </View>
    </TouchableOpacity>
  );
};
