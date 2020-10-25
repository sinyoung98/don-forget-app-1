import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from "axios";
import Logo from '../Logo.png';
import { StackActions } from "@react-navigation/native";
import * as Google from 'expo-google-app-auth';
import * as Expo from 'expo';
import * as Facebook from 'expo-facebook';

function Signin({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  useEffect(() => {
    async function checkUser() {
      await AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        let user = JSON.parse(result);
        return user;
      })
      .then((result) => {
        if (result) {
          console.log(result);
          navigation.replace("Tabs" , {userId : result.id});
        } 
      })
    }
    checkUser();
  }, [])

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
        alert(`${response.name}님 환영합니다.`);
        navigation.replace(`Tabs`, {userId : response.id})
      })
      .then(() => AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        console.log("AsyncStorage:", result);
      }))
      .catch((err) => console.log(err));
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '85751289442-933uucamhnf394m61n9vo38jmtrtgv69.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if(result.type === 'success') {
        axios.post('https://don-forget-server.com/user/signin', {
          email: ['google', result.user.email],
          name: result.user.name
        })
        .then(res => res.data)
        .then(res => {
          AsyncStorage.setItem("LOGIN_TOKEN", JSON.stringify(res));
          alert(`${res.name}님 환영합니다.`);
          navigation.replace(`Tabs`, {userId : res.id})
        })
        .then(() => AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
          console.log("AsyncStorage:", result);
        }))
        .catch((err) => console.log(err));
      } else {
        return { cancelled: true };
      }
    }
    catch(e) {
      return { error: true }
    }
  }
  
  async function facebooklogIn() {
    try {
      await Facebook.initializeAsync({
        appId: '1872331759575671',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // console.log("permissions:", permissions)
        // Get the user's name using Facebook's Graph API
        const response = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
        console.log("response:", response.data.email)
        console.log("response:", response.data.name)
        axios.post('https://don-forget-server.com/user/signin', {
          email: ['facebook', response.data.email],
          name: response.data.name
        })
        .then(res => res.data)
        .then(res => {
          AsyncStorage.setItem("LOGIN_TOKEN", JSON.stringify(res));
          alert(`${res.name}님 환영합니다.`);
          navigation.replace(`Tabs`, {userId : res.id})
        })
        .then(() => AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
          console.log("AsyncStorage:", result);
        }))
        .catch((err) => console.log(err));
      } else {
        return { cancelled: true };
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const signInWithGoogle = () => {
    signInWithGoogleAsync()
  }

  const signInWithFacebook = () => {
    facebooklogIn()
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>로그인</Text>
      <TextInput
        style={email ? styles.inputfocus : styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="이메일 주소 *"
        autoCapitalize="none"
        value={email}
      />
      <TextInput
        style={password ? styles.inputfocus : styles.input}
        onChangeText={text => setPassword(text)}
        placeholder="비밀번호 *"
        autoCapitalize="none"
        value={password}
        secureTextEntry={true}
      />

      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleLoginBtn}>
        <Text style={styles.text}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        console.log("hi")
        navigation.navigate("FindPW")
      }}>
        <Text style={styles.link} >비밀번호 찾기</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.8} onPress={() => {
        navigation.navigate("Signup")
      }}>
        <Text style={styles.registor_link}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.google} onPress={() => signInWithGoogle()}>
        <Text style={styles.text}>구글로 로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebook} onPress={() => signInWithFacebook()}>
        <Text style={styles.text}>페이스북으로 로그인</Text>
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
    top: "0%",
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
    top: "0%",
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
    top: "2%",
    width: "80%",
    height: "7%",
    borderRadius: 5,
    backgroundColor: "#3b23a6",
  },
  text: {
    color: "white",
    textAlign: "center",
    padding: 12
  },
  link: {
    position: "relative",
    top: "60%",
    left: "-30%",
    color: "#4c52f7",
    fontSize: 13,
    marginTop: 10
  },
  registor_link: {
    position: "relative",
    top: "-40%",
    left: "34%",
    color: "#4c52f7",
    fontSize: 13,
    marginTop: 10
  },
  google: {
    position: "relative",
    top: "2%",
    backgroundColor: "rgb(209, 53, 50)",
    width: "80%",
    height: "7%",
    borderRadius: 5,
  },
  facebook: {
    position: "relative",
    top: "2%",
    backgroundColor: "rgb(49, 77, 157)",
    width: "80%",
    height: "7%",
    borderRadius: 5,
    marginTop: 10
  }
})