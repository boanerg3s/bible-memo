import React from "react";
import { AppColors } from "@/styles/colors";
import { AppFontSize } from "@/styles/fontSize";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

interface SwitchProps {
  label?: string;
  defaultValue?: boolean;
  onChange?: (status: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = (props) => {
  const [isActive, setIsActive] = React.useState(props.defaultValue || false);

  const triggerContainerStatusStyle = isActive ? styles.triggerContainerActive : styles.triggerContainerInactive;
  const triggerContainerStyle = [styles.triggerContainer, triggerContainerStatusStyle];

  const triggerBallStatusStyle = isActive ? styles.triggerBallActive : styles.triggerBallInactive;
  const triggerBallStyle = [styles.triggerBall, triggerBallStatusStyle];

  const labelStatusStyle = isActive ? styles.labelActive : styles.labelInactive;
  const labelStyle = [styles.label, labelStatusStyle];

  const onChangeProxy = () => {
    if (props.disabled) return;
    const newValue = !isActive;
    setIsActive(newValue);
    props?.onChange?.(newValue);
  };

  return (
    <TouchableOpacity onPress={onChangeProxy} style={styles.container}>
      <View style={triggerContainerStyle}>
        <View style={triggerBallStyle} />
      </View>

      <Text style={labelStyle}>{props.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(12), alignItems: "center", flexDirection: "row" },
  triggerContainer: {
    width: scale(48),
    height: verticalScale(26),
    borderRadius: scale(26),
    paddingHorizontal: moderateScale(6),
    justifyContent: "center",
  },
  triggerContainerInactive: { backgroundColor: AppColors.lightGray, alignItems: "flex-start" },
  triggerContainerActive: { backgroundColor: AppColors.primary, alignItems: "flex-end" },
  triggerBall: { width: scale(18), height: verticalScale(18), borderRadius: scale(18) },
  triggerBallInactive: { backgroundColor: AppColors.gray },
  triggerBallActive: { backgroundColor: AppColors.white },
  label: { fontWeight: "bold", fontSize: AppFontSize.lg },
  labelActive: { color: AppColors.black },
  labelInactive: { color: AppColors.gray },
});
