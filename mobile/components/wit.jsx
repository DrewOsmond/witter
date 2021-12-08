import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Wit = ({ wit }) => {
  const { user, content, image, replies } = wit;
  return (
    <View>
      <Text>{user.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  witContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // padding: 32,
  },
});

export default Wit;
