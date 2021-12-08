import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from "react-native";

const Wit = ({ wit }) => {
  const { user, content, image, replies } = wit;
  return (
    <View style={styles.witContainer}>
      <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
        {image ? (
          <Image style={styles.witUserImage} source={{ uri: image }} />
        ) : (
          <Image
            style={styles.witUserImage}
            source={{
              uri: "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
            }}
          />
        )}
        <Text style={styles.witUser}>{user.username}</Text>
      </View>

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.witText}>{content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  witContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
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
    color: "#fafafa",
    padding: 16,
    marginTop: 6,
  },
  witText: {
    color: "#fafafa",
    marginLeft: 48,
    marginRight: 16,
    marginBottom: 16,
  },
  witUserImage: {
    marginTop: 10,
    width: 40,
    height: 40,
    borderRadius: 200 / 2,
  },
});

export default Wit;
