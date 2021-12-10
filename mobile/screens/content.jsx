import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Button,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/reducers/session";
import {
  fetchFollowerWits,
  likeWit,
  unlikeWit,
} from "../store/reducers/followerWits";
import axios from "axios";

import Wits from "../components/wits";

const Content = ({ navigation }) => {
  const dispatch = useDispatch();
  const { wits } = useSelector((state) => state.followerContent);
  const { user } = useSelector((state) => state.session);
  const [likes, setLikes] = useState(new Set());

  useEffect(() => {
    dispatch(fetchFollowerWits());
    const userLikes = new Set();
    for (let lyk of user.witLikes) {
      userLikes.add(lyk.witId);
    }
    setLikes(userLikes);
  }, []);

  console.log(likes);

  const handleLike = async (wit) => {
    if (likes.has(wit.id)) {
      await axios
        .delete(
          "http://10.0.0.147:4000/api/wit/unlike",
          { data: { witId: wit.id } },
          {
            witId: wit.id,
          }
        )
        .then(() => {
          setLikes((prev) => {
            const newData = [...prev].filter((ele) => ele !== wit.id);
            console.log(newData);
            return new Set(newData);
          });
          dispatch(unlikeWit({ userId: user.id, witId: wit.id }));
        })
        .catch(console.log);
    } else {
      try {
        const { data } = await axios.post(
          "http://10.0.0.147:4000/api/wit/like",
          {
            wit,
          }
        );
        console.log(data);
        setLikes((prev) => {
          prev.add(wit.id);
          return new Set([...prev]);
        });
        dispatch(likeWit(data));
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };

  return (
    <View style={{ backgroundColor: "#15212a" }}>
      <ScrollView>
        <View style={styles.container}>
          <Button
            style={{ marginTop: 32 }}
            onPress={handleLogout}
            title="logout"
          />
          {wits.length > 0 &&
            wits.map((wit) => (
              <View key={`wit-statuszs-${wit.id}`}>
                <TouchableHighlight
                  onPress={() =>
                    navigation.navigate("Wit", {
                      wit,
                    })
                  }
                >
                  <Wits wit={wit} navigation={navigation} />
                </TouchableHighlight>
                <View style={styles.witContainer}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      marginLeft: 58,
                    }}
                  >
                    <Text style={styles.witReplies}>comments</Text>
                    <Text style={styles.witReplies}>
                      {wit.replies.length > 0 ? wit.replies.length : " "}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginRight: 80,
                    }}
                  >
                    <TouchableHighlight onPress={() => handleLike(wit)}>
                      <Text style={styles.witReplies}>
                        {likes.has(wit.id) ? "liked" : "like"}
                      </Text>
                    </TouchableHighlight>
                    <Text style={styles.witReplies}>
                      {wit.likes.length > 0 ? wit.likes.length : " "}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    marginTop: 32,
    width: "100%",
  },
  witReplies: {
    color: "#fafafa",
    marginLeft: 4,
    marginBottom: 8,
    marginTop: 8,
  },
  witContainer: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    flex: 1,
    flexDirection: "row",
    // justifyContent: "space-end",
  },
});

export default Content;
