import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";

const Wit = ({ navigation, route }) => {
  const [reply, setReply] = useState("");
  const [typing, setTyping] = useState(false);
  const { wit } = route.params;
  const { user, content, image, replies, createdAt } = wit;
  const date = new Date(createdAt);

  console.log(replies);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"padding"}
      //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.witBox}>
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

          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={styles.witText}>{content}</Text>
          </View>
          <Text style={styles.witDate}>{date.toLocaleDateString()}</Text>
        </View>

        {replies.length > 0 ? (
          replies.map((reply) => <Text key={reply.id}>test</Text>)
        ) : (
          <View style={styles.emptyReply}>
            <Text style={styles.emptyReplyText}>Be the first to comment!</Text>
          </View>
        )}
      </ScrollView>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      > */}
      <TextInput
        style={styles.replyInput}
        onFocus={() => setTyping(true)}
        onBlur={() => setTyping(false)}
        onChangeText={setReply}
        value={reply}
      />
      {typing && <Button title="reply" />}
      <View style={{ height: 25 }}></View>
      {/* </KeyboardAvoidingView> */}
      {typing && <View style={{ height: 70 }}></View>}
    </KeyboardAvoidingView>
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
    padding: 16,
    marginTop: 6,
    fontSize: 24,
  },
  witText: {
    color: "#fafafa",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    marginTop: 16,
    fontSize: 16,
  },
  witUserImage: {
    marginTop: 10,
    width: 60,
    height: 60,
    borderRadius: 200 / 2,
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

export default Wit;
