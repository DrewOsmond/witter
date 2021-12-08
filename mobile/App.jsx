import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./store/store";

import HomePage from "./screens/homePage";

export default function App() {
  return (
    <Provider store={store}>
      <View style={{ backgroundColor: "#15212a" }}>
        <HomePage />
      </View>
    </Provider>
  );
}
