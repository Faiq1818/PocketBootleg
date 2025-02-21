import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./components/homeScreen";
import Camera from "./components/camera";

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
      <StatusBar style="light" />
      {/* <Camera /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  texto: {
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
