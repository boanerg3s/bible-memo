import React from "react";
import { router } from "expo-router";
import { useLanguageStore } from "@/stores/language";
import { useObjectiveStore } from "@/stores/objective";
import { initializeDatabase } from "@/services/database";
import { useNotificationStore } from "@/stores/notification";

export const useInitialization = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { objectives, fetchObjectives } = useObjectiveStore((state) => state);
  const { fetchNotificationPreference } = useNotificationStore((state) => state);
  const { fetchLanguagePreference, initLocalization } = useLanguageStore((state) => state);

  const isFirstOpen = React.useMemo(() => {
    return objectives.length === 0;
  }, [objectives, isInitialized]);

  const initialize = async () => {
    await initializeDatabase();

    await Promise.all([
      initLocalization(),
      fetchObjectives(),
      fetchLanguagePreference(),
      fetchNotificationPreference(),
    ]);

    setIsInitialized(true);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    if (isInitialized) {
      if (isFirstOpen) return router.replace("/presentation");
      return router.replace("/home");
    }
  }, [isInitialized, isFirstOpen]);
};
