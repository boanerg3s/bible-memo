import React from "react";
import { AppStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { RevealableCard } from "@/modules/Training/components/revealable-card";

const Component: React.FC<{ verse: App.BibleVerse; isVisible: boolean }> = (props) => {
  const words = props.verse.text.split(" ");

  const mappedWords = words.map((word, index) => {
    const [firstLetter, ...rest] = word;
    const containerKey = `${word}-${index}-${props.verse.number}`;
    const background = !props.isVisible ? { backgroundColor: AppStyles.color.black } : {};

    return (
      <View key={containerKey} style={styles.textContainer}>
        <Text style={styles.text}>{firstLetter}</Text>
        {rest.length ? <Text style={[styles.hidden, background]}>{rest}</Text> : null}
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

export const FirstLetterCard = RevealableCard(Component);

const styles = StyleSheet.create({
  container: { padding: moderateScale(20), flexDirection: "row", flexWrap: "wrap", gap: moderateScale(10) },
  number: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
  textContainer: { flexDirection: "row", gap: moderateScale(2) },
  text: { fontSize: AppStyles.fontSize.lg, color: AppStyles.color.black, fontWeight: "600" },
  hidden: { color: AppStyles.color.black, fontSize: AppStyles.fontSize.lg },
});
