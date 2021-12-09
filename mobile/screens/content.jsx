import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/reducers/session";
import { fetchFollowerWits } from "../store/reducers/followerWits";

import Wits from "../components/wits";

const Content = ({ navigation }) => {
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
              <TouchableHighlight
                onPress={() =>
                  navigation.navigate("Wit", {
                    wit,
                  })
                }
                key={`wit-${wit.id}`}
              >
                <Wits wit={wit} navigation={navigation} />
              </TouchableHighlight>
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
});

export default Content;
