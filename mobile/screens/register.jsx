import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/reducers/session";

const Register = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleSignup = (e) => {
    e.preventDefault();

    const signupInfo = { password, username, email };

    if (email.length < 1 || username.length < 1 || password.length < 1) {
      return setErrors(["username, email, or password must not be blank."]);
    }

    if (password !== confirmPassword) {
      return setErrors(["passwords do not match"]);
    }

    if (
      !email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return setErrors(["must use a valid email address"]);
    }
    dispatch(registerUser(signupInfo));
  };

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("Witter")} style={styles.logo}>
        Witter
      </Text>
      <View style={{ marginTop: 56 }}></View>
      <TextInput
        style={styles.input}
        placeholder="username"
        placeholderTextColor="#fafafa"
        autoCorrect={false}
        onChangeText={setUsername}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        placeholderTextColor="#fafafa"
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        placeholderTextColor="#fafafa"
        onChangeText={setPassword}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="confirm password"
        placeholderTextColor="#fafafa"
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />
      <View style={{ marginTop: 74 }}></View>
      <Button
        onPress={handleSignup}
        title="Signup"
        color="#1d9bf0"
        accessibilityLabel="Register button"
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        title="already have an account? login"
        color="#1d9bf0"
        accessibilityLabel="Register button"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
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
    marginBottom: 16,
    borderColor: "gray",
    borderWidth: 1,
    width: "80%",
    height: "7%",
    paddingLeft: 24,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  button: {
    marginTop: 62,
  },
  signup: {},
});

export default Register;
