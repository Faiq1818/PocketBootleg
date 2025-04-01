import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const navigation = useNavigation();
  const [nim, setNim] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const sendPresensi = async () => {
    setStatus("Mengirim...");

    try {
      const response = await fetch(
        "https://api.itera.ac.id/v2/presensi/kelas",
        {
          method: "POST",
          headers: {
            "User-Agent": "Dart/3.2 (dart:io)",
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate, br",
          },
          body: new URLSearchParams({
            token: token,
            nim: nim,
          }).toString(),
        }
      );

      const data = await response.json();
      console.log("Response:", data);

      if (response.ok) {
        setStatus(`✅ Berhasil: ${data.msg || "Presensi berhasil!"}`);
      } else {
        setStatus(`❌ Gagal: ${data.msg || "Terjadi kesalahan."}`);
      }
    } catch (error) {
      setStatus("❌ Gagal: Periksa koneksi internet.");
    }
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
      </View>
      <View style={style.textInputBoxToken}>
        <TextInput
          placeholder="Masukan Token"
          maxLength={25}
          value={token}
          onChangeText={setToken}
        />
      </View>
      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.button} onPress={sendPresensi}>
          <Text style={style.buttonText}>Absen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => navigation.navigate("QR")}
        >
          <Image
            source={require("../assets/qrIcon.png")}
            style={{ height: 30, width: 30, tintColor: "white" }}
          />
          <Text style={style.buttonText}>QR</Text>
        </TouchableOpacity>
      </View>
      {status ? <Text style={style.statusText}>{status}</Text> : null}
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
  button: {
    borderRadius: 10,
    backgroundColor: "#373737",
    padding: 15,
    paddingHorizontal: 32,
    alignItems: "center",
    margin: 5,
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row", // Membuat tombol berada dalam satu baris
    justifyContent: "space-between", // Memberikan jarak antar tombol
    marginHorizontal: 10,
  },
});
