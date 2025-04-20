import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({ route }) {
  const navigation = useNavigation();
  const [nim, setNim] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const saveNim = async (value) => {
    try {
      await AsyncStorage.setItem("my-nim", value);
      console.log("NIM saved:", value);
    } catch (e) {
      console.error("Error saving value to AsyncStorage", e);
    }
  };

  React.useEffect(() => {
    if (route.params?.showModal) {
      setModalVisible(true);
    }
  }, [route.params?.showModal]);

  return (
    <>
      <View style={style.textInputBoxNIM}>
        <TextInput
          placeholder="Masukan NIM"
          maxLength={12}
          value={nim}
          onChangeText={(text) => {
            setNim(text);
            saveNim(text);
          }}
        />
      </View>

      <View style={style.buttonContainer}>
        <TouchableOpacity
          style={style.button1}
          onPress={() => navigation.navigate("WithToken")}
        >
          <Text style={style.buttonText}>Token</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={style.button2}
          onPress={() => navigation.navigate("QR")}
        >
          <Image
            source={require("../assets/qrIcon.png")}
            style={{ height: 30, width: 30, tintColor: "white" }}
          />
          <Text style={style.buttonText}>QR</Text>
        </TouchableOpacity>

        {/* Modal pop up */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={style.modalCenteredView}>
            <View style={style.modalView}>
              <Text style={style.modalText}>Hello World!</Text>
              <Pressable onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/*  */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
const style = StyleSheet.create({
  textInputBoxNIM: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    width: width * 0.4,
    margin: 10,
  },
  button1: {
    borderRadius: 10,
    backgroundColor: "#373737",
    padding: 15,
    paddingHorizontal: 32,
    alignItems: "center",
    margin: 5,
  },
  button2: {
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
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "red",
    width: windowWidth * 0.8,
    height: windowHeight * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
});
