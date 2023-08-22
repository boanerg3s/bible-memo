import * as Updates from "expo-updates";
import { DevSettings } from "react-native";

export const reloadApplication = __DEV__ ? DevSettings.reload : Updates.reloadAsync;
