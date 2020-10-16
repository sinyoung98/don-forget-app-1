import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet } from 'react-native';
import axios from "axios";
import Logo from '../Logo.png';


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

        navigation.navigate('Home')
      })
      .then(() => AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        console.log("AsyncStorage:", result)
      }))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="Email Address *"
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        placeholder="Password *"
        autoCapitalize="none"
        value={password}
      />
      <Button
        title="LOGIN"
        onPress={handleLoginBtn}
      />
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
    width: 50,
    height: 40,
  },
  title: {
    fontWeight: "700",
    fontSize: 25,
    margin: 10,
  },
  input: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: 5,
    margin: 3
  }
})