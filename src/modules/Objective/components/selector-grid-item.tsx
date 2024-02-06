import React from "react";
import { AppStyles } from "@/styles";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

type SelectorGridItemRef = { setIsItemActive: (value: boolean) => void };
type SelectorGridItemProps = { label: string; setItemAsChosen: () => void; isActive?: boolean; flat: boolean };

export type SelectorGridItemDefinition = {
  id?: string;
  key?: string;
  label?: string;
  isActive?: boolean;
  placeholder?: boolean;
  ref?: React.RefObject<SelectorGridItemRef>;
};

export const SelectorGridItem = React.forwardRef<SelectorGridItemRef, SelectorGridItemProps>((props, ref) => {
  const { label, setItemAsChosen, isActive = false, flat } = props;
  const [isItemActive, setIsItemActive] = React.useState(isActive);
  React.useImperativeHandle(ref, () => ({ setIsItemActive }));

  const color = { color: isItemActive ? AppStyles.color.black : AppStyles.color.gray };

  const styles = StyleSheet.create({
    innerItemContainer: {
      flex: 1,
      borderRadius: scale(12),
      justifyContent: "center",
      height: flat ? verticalScale(36) : "auto",
      paddingHorizontal: moderateScale(flat ? 10 : 0),
      aspectRatio: flat ? undefined : 1 / 1,
      alignItems: flat ? "flex-start" : "center",
      backgroundColor: isItemActive ? AppStyles.color.lightPrimary : AppStyles.color.lightGray,
    },
    itemLabel: {
      fontWeight: "bold",
      fontSize: flat ? AppStyles.fontSize.sm : AppStyles.fontSize.lg,
    },
  });

  const onPress = () => {
    if (isItemActive) return;
    setIsItemActive(true);
    setItemAsChosen();
  };

  return (
    <TouchableOpacity style={commonStyles.itemContainer} onPress={onPress}>
      <View style={styles.innerItemContainer}>
        <Text numberOfLines={1} style={[styles.itemLabel, color]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export const SelectorGridPlaceholder = () => {
  return <View style={commonStyles.itemContainer} />;
};

const commonStyles = StyleSheet.create({ itemContainer: { flex: 1, padding: moderateScale(5) } });
