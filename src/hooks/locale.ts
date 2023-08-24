import { TranslateOptions } from "i18n-js";
import { useLanguageStore } from "@/stores/language";
type TranslatorProxy = (scope: string, options?: TranslateOptions) => string;

export const useLocale = (baseScope?: string) => {
  const t = useLanguageStore((state) => state.t);

  const translatorProxy: TranslatorProxy = (scope, options) => {
    const appendedScope = `${baseScope}.${scope}`;
    return t(appendedScope, options);
  };

  return { t: translatorProxy };
};
