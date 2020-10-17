import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from "axios";
import Logo from '../Logo.png';
import { StackActions } from '@react-navigation/native';
import { nominalTypeHack } from "prop-types";
import { withTheme } from "react-native-elements";

function Signin({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLoginBtn() {
    axios.post('https://don-forget-server.com/user/signin', {
      email: email,
      password: password,
    }, {
      headers: { "Access-Control-Allow-Origin": "*" }
    })
      .then((response) => response.data)
      .then((response) => {
        console.log("email:", email);
        console.log("password:", password);
        AsyncStorage.setItem("LOGIN_TOKEN", JSON.stringify(response));
        alert(`${response.name}님이 로그인되셨습니다`);
        navigation.navigate("Tabs");
      })
      .then(() => AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        console.log("AsyncStorage:", result);
      }))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={email ? styles.inputfocus : styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="Email Address *"
        autoCapitalize="none"
        value={email}
        placeholderTextColor
      />
      <TextInput
        style={email ? styles.inputfocus : styles.input}
        onChangeText={text => setPassword(text)}
        placeholder="Password *"
        autoCapitalize="none"
        value={password}
      />

      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleLoginBtn}>
        <Text style={styles.text}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleLoginBtn}>
        <Text style={styles.link}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={handleLoginBtn}>
        <Text style={styles.registor_link}>회원가입</Text>
      </TouchableOpacity>
    </View>
  )
};
export default Signin;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: "absolute",
    top: "10%",
    width: "13%",
    height: 40,
    resizeMode: "contain"
  },
  title: {
    position: "absolute",
    top: "16%",
    fontWeight: "500",
    fontSize: 25,
    margin: 10,
  },
  input: {
    position: "relative",
    top: "-5%",
    width: "80%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: "3%",
    margin: "3%",
  },
  inputfocus: {
    position: "relative",
    top: "-5%",
    width: "80%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#211ebf',
    borderWidth: 1,
    borderRadius: 6,
    padding: "3%",
    margin: "3%",
  },
  button: {
    position: "relative",
    top: "-0%",
    width: "80%",
    height: "7%",
    borderRadius: 5,
    backgroundColor: "#211ebf",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 12
  },
  link: {
    position: "relative",
    top: "11%",
    left: "-25%",
    color: "#4c52f7",
    fontSize: 13,
    marginTop: 10
  },
  registor_link: {
    position: "relative",
    top: "-90%",
    left: "30%",
    color: "#4c52f7",
    fontSize: 13,
    marginTop: 10
  },
})