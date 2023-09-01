import { ImageBackground, StyleSheet } from "react-native";

export const BookBackground: React.FC = () => {
  return <ImageBackground resizeMode="repeat" source={require("@/assets/books.jpeg")} style={styles.background} />;
};

const styles = StyleSheet.create({
  background: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.15 },
});
