import React from "react";
import { AppStyles } from "@/styles";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { RefreshCcw } from "react-native-feather";
import { scale } from "react-native-size-matters";

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
      append={<RefreshCcw stroke={AppStyles.color.white} width={scale(16)} />}
    >
      {t("action")}
    </Button>
  );
};
