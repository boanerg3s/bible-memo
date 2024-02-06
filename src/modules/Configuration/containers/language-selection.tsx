import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import Entypo from "@expo/vector-icons/Entypo";
import { useLanguageStore } from "@/stores/language";
import RNPickerSelect from "react-native-picker-select";
import { getAvailableLocales } from "@/helpers/language";
import { Platform, StyleSheet, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

export const LanguageSelectionContainer = () => {
  const locales = getAvailableLocales();
  const { t } = useLocale("configuration.containers.language-selection");
  const items = locales.map((locale) => ({ label: t(`picker-language-label.${locale}`), value: locale }));

  const { language, saveLanguagePreference } = useLanguageStore();
  const [languagePicker, setLanguagePicker] = React.useState<typeof language>(language);

  const Icon = () =>
    Platform.OS !== "android" && (
      <View style={{ marginTop: moderateScale(12), marginRight: moderateScale(12) }}>
        <Entypo size={verticalScale(18)} color="gray" name="edit" />
      </View>
    );

  const onClose = () => {
    if (!languagePicker) {
      setLanguagePicker(language);
    }
  };

  const saveNewLanguage = () => {
    saveLanguagePreference(languagePicker);
    console.log("TOAST");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>{t("description")}</Text>

      <RNPickerSelect
        Icon={Icon}
        items={items}
        onClose={onClose}
        value={languagePicker}
        style={pickerSelectStyles}
        onValueChange={setLanguagePicker}
        placeholder={{ label: t("picker-placeholder") }}
      />

      {languagePicker && languagePicker !== language && (
        <Button action={saveNewLanguage} size="small" grow={false} rounded>
          {t("save-preference")}
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: moderateScale(15) },
  description: {
    fontWeight: "bold",
    textTransform: "uppercase",
    color: AppStyles.color.gray,
    fontSize: AppStyles.fontSize.sm,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    padding: moderateScale(12),
    borderRadius: scale(4),
    paddingRight: moderateScale(30),
    color: AppStyles.color.black,
    fontSize: AppStyles.fontSize.base,
    backgroundColor: AppStyles.color.lightGray,
  },
  inputAndroid: {
    padding: moderateScale(12),
    borderRadius: scale(4),
    paddingRight: moderateScale(30),
    color: AppStyles.color.black,
    fontSize: AppStyles.fontSize.base,
    backgroundColor: AppStyles.color.lightGray,
  },
});
