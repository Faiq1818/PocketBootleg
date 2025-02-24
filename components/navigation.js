// import { View, Platform } from "react-native";
// import { useLinkBuilder, useTheme } from "@react-navigation/native";
// import { Text, PlatformPressable } from "@react-navigation/elements";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// function MyTabBar({ state, descriptors, navigation }) {
//   const { colors } = useTheme();
//   const { buildHref } = useLinkBuilder();

//   return (
//     <View style={{ flexDirection: "row" }}>
//       {state.routes.map((route, index) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: "tabPress",
//             target: route.key,
//             canPreventDefault: true,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name, route.params);
//           }
//         };

//         const onLongPress = () => {
//           navigation.emit({
//             type: "tabLongPress",
//             target: route.key,
//           });
//         };

//         return (
//           <PlatformPressable
//             href={buildHref(route.name, route.params)}
//             accessibilityState={isFocused ? { selected: true } : {}}
//             accessibilityLabel={options.tabBarAccessibilityLabel}
//             testID={options.tabBarButtonTestID}
//             onPress={onPress}
//             onLongPress={onLongPress}
//             style={{ flex: 1 }}
//           >
//             <Text style={{ color: isFocused ? colors.primary : colors.text }}>
//               {label}
//             </Text>
//           </PlatformPressable>
//         );
//       })}
//     </View>
//   );
// }

// function MyTabs() {
//   return (
//     <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// }
