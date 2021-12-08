import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableHighlight } from "react-native";
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
    <ScrollView>
      <View style={styles.container}>
        {/* <Button
          style={{ marginTop: 32 }}
          onPress={handleLogout}
          title="logout"
        /> */}
        {wits.length > 0 &&
          wits.map((wit) => (
            <TouchableHighlight
              onPress={() => alert("pressed")}
              key={`wit-${wit.id}`}
            >
              <Wit wit={wit} />
            </TouchableHighlight>
          ))}
      </View>
    </ScrollView>
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
});

export default Content;
