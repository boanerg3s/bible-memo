import React from "react";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { Platform, Text, View } from "react-native";
import { moderateScale, verticalScale } from "react-native-size-matters";
import BottomDrawer, { BottomDrawerMethods } from "react-native-animated-bottom-drawer";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface AddNewTimerDrawerProps {
  add: (time: Date) => void;
}

export interface AddNewTimerDrawerRef {
  open: () => void;
  close: () => void;
}

export const AddNewTimeDrawer = React.forwardRef<AddNewTimerDrawerRef, AddNewTimerDrawerProps>((props, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [newTime, setNewTime] = React.useState(new Date());
  const bottomDrawerRef = React.useRef<BottomDrawerMethods>(null);
  const { t } = useLocale("notification.containers.time-selection");

  React.useImperativeHandle(ref, () => ({
    open: () => {
      bottomDrawerRef?.current?.open();
      setIsOpen(true);
    },
    close: () => {
      bottomDrawerRef?.current?.close();
      setIsOpen(false);
    },
  }));

  const onChangeTimePicker = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === "android") return handleAndroidChange(event, date!);
    if (date) setNewTime(date);
  };

  const handleAndroidChange = (event: DateTimePickerEvent, date: Date) => {
    if (event.type === "dismissed") return setIsOpen(false);
    props.add(date);
  };

  const timePicker = (
    <DateTimePicker
      mode="time"
      value={newTime}
      is24Hour={true}
      disabled={false}
      display="spinner"
      onChange={onChangeTimePicker}
    />
  );

  if (Platform.OS === "android") {
    if (isOpen) return timePicker;
    return null;
  }

  return (
    <BottomDrawer ref={bottomDrawerRef} initialHeight={verticalScale(340)}>
      <View style={{ padding: moderateScale(20), alignItems: "center" }}>
        {timePicker}

        <Button size="small" grow={false} rounded action={() => props.add(newTime)}>
          {t("confirm")}
        </Button>
      </View>
    </BottomDrawer>
  );
});
