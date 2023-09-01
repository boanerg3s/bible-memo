import React from "react";
import { AppStyles } from "@/styles";
import { Button } from "@/components/button";
import { RefreshCcw } from "react-native-feather";
import { useLocale } from "@/hooks/locale";

interface ShuffleButtonProps {
  action: () => void;
}

export const ShuffleButton: React.FC<ShuffleButtonProps> = (props) => {
  const { t } = useLocale("training.components.shuffle-button");
  return (
    <Button
      rounded
      grow={false}
      size="small"
      type="secondary"
      action={props.action}
      append={<RefreshCcw stroke={AppStyles.color.white} width={16} />}
    >
      {t("action")}
    </Button>
  );
};
