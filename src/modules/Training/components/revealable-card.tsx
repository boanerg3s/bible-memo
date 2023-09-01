import React from "react";
import { Card } from "@/components/card";
import { TouchableOpacity } from "react-native";

type Card = { verse: App.BibleVerse; isVisible: boolean };

export const RevealableCard = <T extends Pick<Card, "verse">>(WrappedComponent: React.ComponentType<Card>) => {
  return (props: T) => {
    const [isVisible, setIsVisible] = React.useState(false);
    const onPress = () => setIsVisible(!isVisible);

    return (
      <Card>
        <TouchableOpacity onPress={onPress}>
          <WrappedComponent verse={props.verse} isVisible={isVisible} />
        </TouchableOpacity>
      </Card>
    );
  };
};
