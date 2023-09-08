import React from "react";
import { Card } from "@/components/card";
import { useLocale } from "@/hooks/locale";
import { Button } from "@/components/button";
import { TextInput, View } from "react-native";

interface Props {
  onListen: (value: string) => void;
}

export const WriteBox: React.FC<Props> = (props) => {
  const [value, setValue] = React.useState("");
  const { t } = useLocale("evaluation.components.write-box");
  const action = () => props.onListen(value);

  return (
    <View style={{ flexDirection: "column", gap: 20, width: "100%" }}>
      <Card>
        <TextInput
          multiline
          numberOfLines={6}
          style={{ padding: 20 }}
          onChangeText={setValue}
          textAlignVertical="top"
          placeholder={t("write-here")}
        />
      </Card>

      <Button type="primary" size="small" rounded action={action}>
        {t("evaluate")}
      </Button>
    </View>
  );
};
