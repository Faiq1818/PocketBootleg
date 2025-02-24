import { View, Text, StyleSheet, TextInput } from "react-native";
export default function Home() {
  return (
    <>
      <View style={style.textInputBox}>
        <TextInput placeholder="Masukan NIM" maxLength={12} />
      </View>
      <View style={style.textInputBox}>
        <TextInput placeholder="Masukan Token" maxLength={12} />
      </View>
    </>
  );
}

const style = StyleSheet.create({
  textInputBox: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: 150,
    margin: 10,
  },
  texto: {
    color: "white",
  },
});
