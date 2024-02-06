import React from "react";
import { AppStyles } from "@/styles";
import { ButtonProps } from "@/components/button/interface";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Button = (props: ButtonProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { grow = true, rounded = false, size = "large", type = "primary", disabled = false, append } = props;

  const onPress = async () => {
    if (disabled) return;

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
      gap: moderateScale(10),
      width: "auto",
      flex: grow ? 1 : 0,
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: moderateScale(10),
      justifyContent: "center",
      height: verticalScale(size === "large" ? 48 : 36),
      borderRadius: scale(rounded ? (size === "large" ? 12 : 48) : 0),
      backgroundColor: disabled
        ? AppStyles.color.lightGray
        : type === "primary"
        ? AppStyles.color.primary
        : type === "danger"
        ? AppStyles.color.red
        : AppStyles.color.gray,
    },
    label: {
      fontWeight: "bold",
      textTransform: "uppercase",
      opacity: isLoading ? 0 : 1,
      color: disabled ? AppStyles.color.gray : AppStyles.color.white,
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
        {append && append}
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
