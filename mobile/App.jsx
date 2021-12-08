import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";

import HomePage from "./screens/homePage";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ backgroundColor: "#15212a" }}>
        {/* <View style={styles.container}></View> */}
        <HomePage />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
