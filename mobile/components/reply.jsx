import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Reply = ({ reply }) => {
  return (
    <View style={styles.witBox}>
      <View style={{ flex: 1, flexDirection: "row", padding: 8 }}>
        {reply.user.picture ? (
          <Image
            style={styles.witUserImage}
            source={{ uri: reply.user.picture }}
          />
        ) : (
          <Image
            style={styles.witUserImage}
            source={require("../assets/cat.png")}
          />
        )}
        <Text style={styles.witUser}>{reply.user.username}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.witText}>{reply.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15212a",
    flex: 1,
    width: "100%",
    height: "100%",
  },
  witBox: {
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
    color: "#fafafa",
    marginLeft: 12,
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  witText: {
    color: "#fafafa",
    marginLeft: 50,
    marginRight: 16,
    marginBottom: 16,
    marginTop: 4,
    fontSize: 14,
    letterSpacing: 0.3,
    lineHeight: 20,
  },
  witUserImage: {
    width: 40,
    height: 40,
    borderRadius: 200 / 2,
    marginLeft: 16,
    marginTop: 8,
  },
  witDate: {
    color: "#fafafa",
    marginLeft: 16,
    marginBottom: 16,
    fontSize: 12,
  },
  emptyReply: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyReplyText: {
    color: "#fafafa",
    marginTop: 40,
  },

  replyInput: {
    alignSelf: "center",
    width: "90%",
    color: "#fafafa",
    backgroundColor: "gray",
    borderRadius: 20,
    height: 30,
    paddingLeft: 16,
    paddingRight: 16,
  },
});

export default Reply;
