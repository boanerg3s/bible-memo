import { Button } from "@/components/button";
import { AppStyles } from "@/styles";
import { StyleSheet, Text, View } from "react-native";

export const WelcomePage: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.artContainer} />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          Seja bem-vindo ao{"\n"}
          Bible Memo.
        </Text>

        <Text style={styles.description}>
          Você está prestes a iniciar sua jornada de{"\n"}
          memorização bíblica e nosso desejo é{"\n"}
          tornar este percurso muito{"\n"}
          mais prático e rápido.
        </Text>
      </View>

      <Button action={() => null}>Iniciar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  artContainer: { flex: 1 },
  contentContainer: { padding: 10 },
  container: { flex: 1 },
  title: { fontSize: AppStyles.fontSize["3xl"], fontWeight: "bold" },
  description: { fontSize: AppStyles.fontSize.base, marginVertical: 10, lineHeight: 24 },
});
