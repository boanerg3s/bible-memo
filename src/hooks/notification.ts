import React from "react";
import { DeviceEventEmitter } from "react-native";
import { useNotificationStore } from "@/stores/notification";

/**
 * Custom hook to keep system sync with isRinging data
 */
export function useIsRingingSync() {
  const { fetchIsRinging } = useNotificationStore();

  React.useEffect(() => {
    fetchIsRinging();
    DeviceEventEmitter.addListener("ALARM_CHANGED", fetchIsRinging);
    return () => DeviceEventEmitter.removeAllListeners();
  }, []);
}
