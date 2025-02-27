import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import * as Clipboard from "expo-clipboard";

export default function QrCodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [zoom, setZoom] = useState(0);

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
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "pdf417"],
        }}
        style={StyleSheet.absoluteFillObject}
        zoom={zoom}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => setZoom(0)}>
          <Text style={styles.buttonText}>Zoom x0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setZoom(0.5)}>
          <Text style={styles.buttonText}>Zoom x0.5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setZoom(1)}>
          <Text style={styles.buttonText}>Zoom x1</Text>
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
