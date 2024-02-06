import React from "react";
import { AppStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { pickRandomNumbers } from "@/modules/Training/helpers/fragments";
import { RevealableCard } from "@/modules/Training/components/revealable-card";

const Component: React.FC<{ verse: App.BibleVerse; isVisible: boolean }> = (props) => {
  const words = React.useMemo(() => props.verse.text.split(" "), [props.verse]);
  const visibleIndexes = React.useMemo(() => pickRandomNumbers(words.length), [props.verse]);

  const mappedWords = words.map((word, index) => {
    const isWordVisible = visibleIndexes.includes(index);
    const isVisible = isWordVisible || props.isVisible;
    const wordStyle = isVisible ? styles.textContainer : styles.hiddenTextContainer;

    return (
      <View key={`${word}-${index}-${props.verse.number}`} style={wordStyle}>
        <Text style={styles.text}>{word}</Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.verse.number}</Text>
      {mappedWords}
    </View>
  );
};

export const FragmentsCard = RevealableCard(Component);

const styles = StyleSheet.create({
  container: { padding: moderateScale(20), flexDirection: "row", flexWrap: "wrap", gap: moderateScale(10) },
  number: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
  textContainer: { flexDirection: "row", gap: moderateScale(2) },
  text: { fontSize: AppStyles.fontSize.lg, color: AppStyles.color.black },
  hiddenTextContainer: { backgroundColor: AppStyles.color.black },
});
