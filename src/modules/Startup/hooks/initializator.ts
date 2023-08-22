import React from "react";
import { router } from "expo-router";
import { useLanguageStore } from "@/stores/language";
import { useObjectiveStore } from "@/stores/objective";
import { initializeDatabase } from "@/services/database";
import { useNotificationStore } from "@/stores/notification";

export const useInitialization = () => {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const { fetchLanguagePreference } = useLanguageStore((state) => state);
  const { objectives, fetchObjectives } = useObjectiveStore((state) => state);
  const { fetchNotificationPreference } = useNotificationStore((state) => state);

  const isFirstOpen = React.useMemo(() => {
    return objectives.length === 0;
  }, [objectives, isInitialized]);

  const initialize = async () => {
    await initializeDatabase();
    await fetchLanguagePreference();
    await fetchNotificationPreference();
    await fetchObjectives();
    setIsInitialized(true);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  React.useEffect(() => {
    if (isInitialized) {
      if (isFirstOpen) return router.replace("/welcome");
      return router.replace("/home");
    }
  }, [isInitialized, isFirstOpen]);
};
