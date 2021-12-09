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
  Keyboard,
  Button,
} from "react-native";
import axios from "axios";

import Reply from "../components/reply";

const Wit = ({ navigation, route }) => {
  const { wit } = route.params;
  const { user, content, image, replies, createdAt } = wit;
  const [reply, setReply] = useState("");
  const [typing, setTyping] = useState(false);
  const [witReplies, setWitReplies] = useState(replies);
  const date = new Date(createdAt);

  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://10.0.0.147:4000/api/reply/create",
        {
          witId: wit.id,
          content: reply,
        }
      );
      setWitReplies((prev) => [...prev, data]);
      setTyping(false);
      setReply("");
      Keyboard.dismiss();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={styles.witBox}>
          <View style={{ flex: 1, flexDirection: "row", padding: 16 }}>
            {user.image ? (
              <Image style={styles.witUserImage} source={{ uri: user.image }} />
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

        {witReplies.length > 0 ? (
          witReplies.map((reply) => (
            <Reply key={`reply-${reply.id}`} reply={reply} />
          ))
        ) : (
          <View style={styles.emptyReply}>
            <Text style={styles.emptyReplyText}>Be the first to comment!</Text>
          </View>
        )}
      </ScrollView>
      <View style={{ backgroundColor: "black" }}>
        <TextInput
          style={styles.replyInput}
          placeholder="reply"
          placeholderTextColor="#fafafa"
          color="#fafafa"
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
          onChangeText={setReply}
          value={reply}
        />
      </View>
      {typing && (
        <View style={{ backgroundColor: "black" }}>
          <Button title="reply" onPress={handleReply} />
        </View>
      )}
      <View style={{ height: 25, backgroundColor: "black" }}></View>
      {/* </KeyboardAvoidingView> */}
      {typing && <View style={{ height: 70, backgroundColor: "black" }}></View>}
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
    fontWeight: "bold",
  },
  witText: {
    color: "#fafafa",
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
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
    marginTop: 2,
    backgroundColor: "black",
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
