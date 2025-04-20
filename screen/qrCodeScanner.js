import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { sendPresensi } from "../components/SendPresensi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [nim, setNim] = useState("");
  const [status, setStatus] = useState("");
  const [token, setToken] = useState("");
  const [savedZoom, setSavedZoom] = useState(0);
  const navigation = useNavigation();

  const handlePresensi = () => {
    sendPresensi(nim, token, setStatus, navigation);
    setScanned(false);
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

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      let newZoom = savedZoom + (e.scale - 1) * 1;
      newZoom = Math.max(0, Math.min(newZoom, 1));
      setZoom(newZoom);
    })
    .onEnd(() => {
      setSavedZoom(zoom);
    });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.mediaType,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      try {
        const scanResult = await Camera.scanFromURLAsync(result.assets[0].uri);
        console.log("Scan Result:", scanResult[0].data);
        setToken(scanResult[0].data);
        handlePresensi();
      } catch (error) {
        console.error("Error scanning image:", error);
      }
    } else {
      alert("You did not select any image.");
    }
  };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    2;
    getCameraPermissions();
    getData();
  }, []);

  useEffect(() => {
    if (scanned && token) {
      handlePresensi();
    }
  }, [scanned, token, handlePresensi]);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setToken(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector gesture={pinchGesture}>
          <>
            <CameraView
              onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
              barcodeScannerSettings={{
                barcodeTypes: ["qr", "pdf417"],
              }}
              style={StyleSheet.absoluteFillObject}
              zoom={zoom}
            />
          </>
        </GestureDetector>
      </GestureHandlerRootView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickImageAsync()}
        >
          <Text style={styles.buttonText}>Ambil dari galeri</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanAgain: {
    position: "absolute",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#373737",
    top: "50%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    backgroundColor: "#373737",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
