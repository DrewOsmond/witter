import React, { useEffect } from "react";
import ReactNative, { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { restoreUser, loginUser } from "../store/reducers/session";

import Login from "../components/login";
import Content from "../components/content";

const HomePage = () => {
  const { user } = useSelector((state) => state.session);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(restoreUser());
  }, []);
  console.log(user);
  return <View>{user ? <Content /> : <Login />}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomePage;
