import React from "react";
import { useObjectiveStore } from "@/stores/objective";
import { initializeDatabase } from "@/services/database-service";
import { useLanguageStore } from "@/stores/language";
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

  return { isInitialized, isFirstOpen };
};
