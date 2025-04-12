import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Dimensions } from "react-native";
import { sendPresensi } from "../components/SendPresensi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

export default function TokenScreen() {
  const [nim, setNim] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");

  const handlePresensi = () => {
    sendPresensi(nim, token, setStatus);
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("my-nim");
      if (value !== null) {
        setNim(value);
      }
    } catch (e) {
      console.error("Error reading value", e);
    }
  };

  useEffect(() => {
    // Panggil getData ketika komponen pertama kali di-render
    getData();
  }, []);

  return (
    <>
      <View style={style.textInputBoxToken}>
        <TextInput
          placeholder="Masukan Token"
          maxLength={25}
          value={token}
          onChangeText={setToken}
        />
      </View>

      <TouchableOpacity style={style.buttonPresensi} onPress={handlePresensi}>
        <Text style={style.buttonPresensiText}>Absen</Text>
      </TouchableOpacity>
      {status ? <Text style={style.statusText}>{status}</Text> : null}
    </>
  );
}
const style = StyleSheet.create({
  textInputBoxToken: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: width * 0.6,
    margin: 10,
  },
  buttonPresensi: {
    borderRadius: 10,
    backgroundColor: "#373737",
    padding: 15,
    paddingHorizontal: 32,
    alignItems: "center",
    margin: 5,
  },
  buttonPresensiText: {
    color: "white",
  },
});
