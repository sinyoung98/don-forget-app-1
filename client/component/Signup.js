import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";
import Logo from '../Logo.png';
import RNPickerSelect from 'react-native-picker-select';

export default function Signup({ navigation }) {

  const [inputEmail, setEmail] = useState("");
  const [inputPW, setPW] = useState("");
  const [inputName, setName] = useState("");
  const [inputPWCheck, setPWCheck] = useState("");
  const [passwordHint, setHint] = useState(null);
  const [hintAnswer, setAnswer] = useState("");


  const createEmailAlert = () =>
    Alert.alert(
      "⚠️ Error",
      " 유효하지 않은 이메일입니다",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );


  const createPWAlert = () =>
    Alert.alert(
      "⚠️ Error",
      "비밀번호가 일치하지 않습니다",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const createSignupErr = () =>
    Alert.alert(
      "⚠️ Error",
      "입력되지 않은 곳이 있습니다",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

    const conflict = () =>
    Alert.alert(
      "⚠️ 이미 가입된 이메일 주소입니다",
      `다른 이메일 주소를 입력해주세요`,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  function handleSignupBtn() {
    console.log(inputEmail, inputPW, inputName, passwordHint, hintAnswer)
    if (!validate(inputEmail)) {
      createEmailAlert();
    }
    else if ((inputPW !== inputPWCheck) || inputPW === "") {
      console.log(inputPWCheck);
      createPWAlert();
    }
    else if (!(inputEmail && inputPW && inputName && passwordHint && hintAnswer)) {
      createSignupErr();
    }
    else {
      axios.post("https://don-forget-server.com/user/signup", {
        email: inputEmail,
        password: inputPW,
        name: inputName,
        type: passwordHint,
        password_answer: hintAnswer
      }, {
        headers: { "Access-Control-Allow-Origin": "*" }
      })
        .then((res) => console.log(res.data))
        .then(() => navigation.navigate("Signin"))
        .catch((err) => conflict())
    }
  }

  function validate(text) {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  }


  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>회원가입</Text>
      <TextInput
        style={inputEmail ? styles.inputfocus : styles.input}
        onChangeText={text => setEmail(text)}
        placeholder="이메일 주소 *"
        autoCapitalize="none"
        value={inputEmail}
      />
      <TextInput
        style={inputName ? styles.inputfocus : styles.input}
        onChangeText={text => setName(text)}
        placeholder="이름 *"
        autoCapitalize="none"
        value={inputName}
      />
      <TextInput
        style={inputPW ? styles.inputfocus : styles.input}
        onChangeText={text => setPW(text)}
        placeholder="비밀번호 *"
        autoCapitalize="none"
        value={inputPW}
        secureTextEntry={true}
      />
      <TextInput
        style={inputPWCheck ? styles.inputfocus : styles.input}
        onChangeText={text => setPWCheck(text)}
        placeholder="비밀번호 확인 *"
        autoCapitalize="none"
        value={inputPWCheck}
        secureTextEntry={true}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.select}>
        <RNPickerSelect
          style={styles.select}
          placeholder={{
            label: '비밀번호 찾기 힌트 질문 *',
            value: null,
          }}
          onValueChange={(value) => {
            console.log(value);
            setHint(value)
          }}
          items={[
            { label: '가장 기억에 남는 선생님 성함은?', value: 1, key: 1 },
            { label: '내가 존경하는 인물은?', value: 2, key: 2 },
            { label: '나의 노래방 애창곡은?', value: 3, key: 3 },
          ]}
        />
      </TouchableOpacity>
      <TextInput
        style={hintAnswer ? styles.inputfocus : styles.input}
        onChangeText={text => setAnswer(text)}
        placeholder="비밀번호 찾기 힌트 답 *"
        autoCapitalize="none"
        value={hintAnswer}
      />
      <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleSignupBtn}>
        <Text style={styles.text}>회원가입</Text>
      </TouchableOpacity>
    </View>
  )
}



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
  },
  title: {
    position: "absolute",
    top: "16%",
    fontWeight: "500",
    fontSize: 20,
    margin: 10,
  },
  input: {
    position: "relative",
    top: "8%",
    width: "75%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 6,
    padding: "2%",
    margin: "3%",
  },
  inputfocus: {
    position: "relative",
    top: "8%",
    width: "75%",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#211ebf',
    borderWidth: 1,
    borderRadius: 6,
    padding: "2.5%",
    margin: "3%",
  },
  button: {
    position: "relative",
    top: "10%",
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
  select: {
    position: "relative",
    top: "8%",
    width: "74%",
    height: "5%",
    margin: "3%",
    padding: "2%",
    borderBottomWidth: 1
  }
})