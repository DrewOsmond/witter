import React, { useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { logoutUser } from "../store/reducers/session";
import { fetchFollowerWits } from "../store/reducers/followerWits";
import { useDispatch, useSelector } from "react-redux";

import Wit from "./wit";

const Content = () => {
  const dispatch = useDispatch();
  const { wits } = useSelector((state) => state.followerContent);
  useEffect(() => {
    dispatch(fetchFollowerWits());
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutUser());
  };
  return (
    // <View style={styles.container}>
    <ScrollView>
      <View style={styles.container}>
        <Button
          style={{ marginTop: 32 }}
          onPress={handleLogout}
          title="logout"
        />
        {wits.length > 0 &&
          wits.map((wit) => <Wit key={`wit-${wit.id}`} wit={wit} />)}
      </View>
    </ScrollView>
    // </View>
  );
};

let ScreenHeight = Dimensions.get("window").height;
// console.log(screenHeight);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "white",
    // backgroundColor: "black",
    // padding: 32,
    width: "100%",
    height: Dimensions.get("window").height,
  },
});

export default Content;
