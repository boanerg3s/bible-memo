import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// TODO
export const HeaderIcons: React.FC = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text>O</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text>O</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
