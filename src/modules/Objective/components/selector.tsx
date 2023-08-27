import React from "react";
import { View } from "react-native";
import { Card } from "@/components/card";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface SelectorRef {
  changeContentVisibilityTo: (value: boolean) => void;
}

interface SelectorProps {
  disabled?: boolean;
  visibilityStart?: boolean;
  header: React.ReactElement;
  children: React.ReactElement;
}

export const Selector = React.forwardRef<SelectorRef, SelectorProps>((props, ref) => {
  const { disabled = false, header, children, visibilityStart = true } = props;
  const [isContentVisible, setIsContentVisible] = React.useState(visibilityStart);

  const toggleContent = () => setIsContentVisible(!isContentVisible);
  React.useImperativeHandle(ref, () => ({ changeContentVisibilityTo: setIsContentVisible }));

  return (
    <Card disabled={disabled}>
      <TouchableOpacity onPress={toggleContent}>
        <View>{header}</View>
      </TouchableOpacity>

      <View style={{ height: !isContentVisible || disabled ? 0 : "auto" }}>{children}</View>
    </Card>
  );
});
