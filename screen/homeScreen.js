import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Home() {
  const [nim, setNim] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState(""); // State untuk status presensi

  const sendPresensi = async () => {
    setStatus("Mengirim..."); // Menampilkan status saat request dikirim

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
      <TouchableOpacity style={style.button} onPress={sendPresensi}>
        <Text style={style.buttonText}>Absen</Text>
      </TouchableOpacity>
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
    width: 150,
    margin: 10,
  },
  textInputBoxToken: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: 230,
    margin: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#373737",
    padding: 15,
    paddingHorizontal: 32,
    alignItems: "center",
    margin: 10,
  },
  buttonText: {
    color: "white",
  },
});
