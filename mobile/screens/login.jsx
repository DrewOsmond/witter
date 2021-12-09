import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/reducers/session";

const login = ({ navigation }) => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.session);

  const handeLogin = (e) => {
    e.preventDefault();
    const loginInfo = { password };

    if (password.length < 0 || credential.length < 0) {
      setErrors(["username, email, or password must not be blank."]);
      return;
    }

    if (
      credential
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      loginInfo.email = credential;
    } else {
      loginInfo.username = credential;
    }
    dispatch(loginUser(loginInfo));
  };

  return (
    <View
      style={styles.container}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* <KeyboardAvoidingView> */}
      <View style={styles.container}>
        <Text onPress={() => navigation.navigate("Witter")} style={styles.logo}>
          Witter
        </Text>
        {/* <View style={{ marginTop: 30 }}></View> */}
        <View
          style={{
            flex: 1,
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="username or email"
            placeholderTextColor="#fafafa"
            autoCorrect={false}
            onChangeText={setCredential}
            value={credential}
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#fafafa"
            secureTextEntry={true}
            autoCorrect={false}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View style={{ marginTop: 30 }}></View>
        <View style={styles.button}>
          <Button
            onPress={handeLogin}
            title="Login"
            color="#1d9bf0"
            accessibilityLabel="Login button"
          />
        </View>
        <View style={styles.signup}>
          <Button
            onPress={() => navigation.navigate("Register")}
            title="don't have an account? signup"
            color="#1d9bf0"
          />
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#15212a",
  },
  logo: {
    color: "#1d9bf0",
    fontSize: 55,
    fontWeight: "bold",
    marginTop: 50,
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fafafa",
    width: "80%",
    marginTop: 64,
  },
  input: {
    color: "#fafafa",
    marginBottom: 15,
    borderColor: "gray",
    borderWidth: 1,
    // width: "80%",
    // height: "7%",
    height: 50,
    width: "80%",
    paddingLeft: 24,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {},
  signup: {
    marginBottom: 24,
  },
});

export default login;
