import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";

export default function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0);
  const [savedZoom, setSavedZoom] = useState(0);

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
      } catch (error) {
        console.error("Error scanning image:", error);
      }
    } else {
      alert("You did not select any image.");
    }
  };

  const copyToClipboard = async (data) => {
    await Clipboard.setStringAsync(data);
  };

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Token telah disalin, silahkan tempel di input token.`);
    copyToClipboard(data);
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
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
            zoom={zoom}
          />
        </GestureDetector>
      </GestureHandlerRootView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => pickImageAsync()}
        >
          <Text style={styles.buttonText}>Ambil Gambar</Text>
        </TouchableOpacity>
      </View>
      {scanned && (
        <TouchableOpacity
          style={styles.scanAgain}
          onPress={() => setScanned(false)}
        >
          <Text style={{ color: "white" }}>Tekan untuk scan lagi</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scanAgain: {
    margin: 72,
    borderRadius: 10,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#373737",
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
