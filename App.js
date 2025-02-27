import * as React from "react";
import {
  createStaticNavigation,
  NavigationContainer,
} from "@react-navigation/native";
import { View, Platform, StyleSheet, Text, StatusBar } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
//screen
import Home from "./screen/homeScreen";
import QrCodeScanner from "./screen/qrCodeScanner";

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={style.notDock}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={style.dock}
          >
            <Text style={{ color: isFocused ? "#999999" : "#373737" }}>
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={style.forHome}>
      <Home />
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={style.forProfileScreen}>
      <QrCodeScanner />
    </View>
  );
}

const MyTabs = createBottomTabNavigator({
  tabBar: (props) => <MyTabBar {...props} />,
  screens: {
    Home: HomeScreen,
    QR: ProfileScreen,
  },
});

const Navigation = createStaticNavigation(MyTabs);

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Navigation style={{ backgroundColor: "black" }} />
    </>
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
  notDock: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  dock: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});
