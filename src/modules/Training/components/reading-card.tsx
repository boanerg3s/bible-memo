import { Card } from "@/components/card";
import { AppStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";

export const ReadingCard: React.FC<{ verse: App.BibleVerse }> = (props) => {
  return (
    <Card>
      <View style={styles.container}>
        <Text style={styles.text}>
          <Text style={styles.number}>{props.verse.number} </Text>
          {props.verse.text}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexDirection: "row" },
  number: { fontSize: AppStyles.fontSize.sm, color: AppStyles.color.gray, fontWeight: "bold" },
  text: { fontSize: AppStyles.fontSize.base, color: AppStyles.color.black },
});
