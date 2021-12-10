import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

const Wit = ({ wit, navigation }) => {
  const { user, content, image, replies, likes } = wit;

  return (
    <View>
      <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
        {image ? (
          <Image style={styles.witUserImage} source={{ uri: image }} />
        ) : (
          <Image
            style={styles.witUserImage}
            source={require("../assets/cat.png")}
          />
        )}
        <Text style={styles.witUser}>{user.username}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.witText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  witContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
  },
  witUserHeader: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 16,
  },
  witUser: {
    color: "white",
    padding: 16,
    marginTop: -3,
    marginLeft: -8,
    fontWeight: "bold",
    fontSize: 18,
  },
  witText: {
    color: "#fafafa",
    marginLeft: 66,
    marginRight: 16,
    marginBottom: 16,
    marginTop: -26,
    fontSize: 14,
  },
  witUserImage: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 200 / 2,
  },
});

export default Wit;
