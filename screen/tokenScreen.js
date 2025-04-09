import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Dimensions } from "react-native";
import { sendPresensi } from "../components/SendPresensi";

const { width } = Dimensions.get("window");

export default function TokenScreen() {
  const [nim, setNim] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  const handlePresensi = () => {
    sendPresensi(nim, token, setStatus);
  };

  return (
    <>
      <View style={style.textInputBoxNIM}>
        <TextInput
          placeholder="Masukan NIM"
          maxLength={12}
          value={nim}
          onChangeText={setNim}
        />
        <View style={style.textInputBoxToken}>
          <TextInput
            placeholder="Masukan Token"
            maxLength={25}
            value={token}
            onChangeText={setToken}
          />
        </View>

        <TouchableOpacity style={style.button} onPress={handlePresensi}>
          <Text style={style.buttonText}>Absen</Text>
        </TouchableOpacity>
        {status ? <Text style={style.statusText}>{status}</Text> : null}
      </View>
    </>
  );
}
const style = StyleSheet.create({
  textInputBoxNIM: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: width * 0.4,
    margin: 10,
  },
  textInputBoxToken: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: width * 0.6,
    margin: 10,
  },
});
