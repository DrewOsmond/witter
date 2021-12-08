import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/reducers/session";

const login = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.session);

  const handeLogin = (e) => {
    e.preventDefault();
    const loginInfo = { password };

    if (!password.length || !credential.length) {
      setErrors(["username, email, or password must not be blank."]);
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
    <View style={styles.container}>
      <Text style={styles.logo}>Witter</Text>
      <View style={{ marginTop: 112 }}></View>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fafafa"
        placeholder="username or email"
        onChangeText={setCredential}
        value={credential}
      />

      <TextInput
        style={styles.input}
        placeholderTextColor="#fafafa"
        placeholder="password"
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        underlineColorIos="green"
      />
      <View style={{ marginTop: 72 }}></View>
      <View style={styles.button}>
        <Button
          onPress={handeLogin}
          title="Login"
          color="#1d9bf0"
          accessibilityLabel="Login button"
        />
      </View>
      <View style={styles.signup}>
        <Button title="already a user? signup" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    marginTop: 82,
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
    marginBottom: 16,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    height: "7%",
    padding: 24,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    marginTop: 48,
  },
  signup: {
    marginBottom: "10%",
  },
});

export default login;
