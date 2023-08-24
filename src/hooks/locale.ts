import { useLanguageStore } from "@/stores/language";
export const useLocale = () => ({ t: useLanguageStore((state) => state.t) });
