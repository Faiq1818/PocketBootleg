import * as React from "react";
import { useNavigation, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Platform, StyleSheet, Text, StatusBar } from "react-native";
//screen
import Home from "./screen/homeScreen";
import QrCodeScanner from "./screen/qrCodeScanner";
import TokenScreen from "./screen/tokenScreen";

function HomeScreen() {
  return (
    <View style={style.forHome}>
      <Home />
    </View>
  );
}

function QRScreen() {
  return (
    <View style={style.forProfileScreen}>
      <QrCodeScanner />
    </View>
  );
}

function TokenScreenApp() {
  return (
    <View style={style.forProfileScreen}>
      <TokenScreen />
    </View>
  );
}

function MyStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        title: "PocketBootleg",
        headerStyle: {
          backgroundColor: "#373737",
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="QR" component={QRScreen} />
      <Stack.Screen name="WithToken" component={TokenScreenApp} />
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <MyStack />
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  forHome: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  forProfileScreen: {
    flex: 1,
  },
});
