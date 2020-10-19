import React, { useState, useEffect } from "react"
import { AsyncStorage, Dimensions, ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button, } from 'react-native';
import axios from "axios";
import { StackActions } from "@react-navigation/native";

export default function ChangePW({ navigation }) {

  // 유저 데이터({id, name, email})
  const [userData, setUserData] = useState(null);

  const [oldPw, setOldPw] = useState("");
  const [isRightPassword, setIsRightPassword] = useState(false);
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");

  useEffect(() => {
    async function fetchData() {
      // 로그인 유저 데이터 받아오기
      await AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        setUserData(JSON.parse(result));
      })
    }
    fetchData();
    console.log("userData:", userData);
  }, [])

  const checkPasswordHandler = () => {
    axios.post(`https://don-forget-server.com/user/confirmuser/${userData.id}`, {
      password: oldPw
    })
      .then(res => {
        console.log(res.data);
        // 새 비밀번호 입력 창 띄움
        setIsRightPassword(true);
      })
      .catch((err) => {
        console.log(err)
        alert("비밀번호가 다릅니다.")
      });
  }

  const changePasswordHandler = () => {
    if (newPw === newPwCheck) {
      axios.post(`https://don-forget-server.com/user/changepassword/${userData.id}`, {
        password: newPw
      })
        .then(res => {
          console.log(res.data);
          alert("비밀번호가 변경되었습니다.");
        })
        .then(() => {
          setIsRightPassword(false);
          navigation.navigate("Mypage");
        })
        .catch((err) => console.log(err));
    }
    else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }

  return (
    <View style={{ backgroundColor: "white", height: Dimensions.get("screen").height }}>
      <View style={{ alignSelf: "center", margin: "auto", width: "80%" }}>
        <Text style={styles.title}>비밀번호 변경</Text>
        <Text style={styles.text}>기존 비밀번호를 입력해주세요</Text>
        <TextInput
          style={oldPw ? styles.inputfocus : styles.input}
          onChangeText={text => setOldPw(text)}
          placeholder="don-forget 기존 비밀번호"
          autoCapitalize="none"
          value={oldPw}
        />
        <TouchableOpacity activeOpacity={0.8} style={isRightPassword ? styles.right : styles.button}
          onPress={checkPasswordHandler}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
        <View style={isRightPassword ? { display: "flex" } : { display: "none" }}>
          <TextInput
            style={newPw ? styles.inputfocus : styles.input}
            onChangeText={text => setNewPw(text)}
            placeholder="don-forget 새 비밀번호"
            autoCapitalize="none"
            value={newPw}
          />
          <TextInput
            style={newPwCheck ? styles.inputfocus : styles.input}
            onChangeText={text => setNewPwCheck(text)}
            placeholder="don-forget 새 비밀번호 확인"
            autoCapitalize="none"
            value={newPwCheck}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity activeOpacity={0.8} style={styles.button_2}
              onPress={changePasswordHandler}>
              <Text style={styles.buttonText}>비밀번호 변경</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button_2}
              onPress={() => { navigation.navigate("Mypage") }}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "500",
    fontSize: 20,
    color: "#2e6ef7",
    textAlign: "center",
    marginTop: 60
  },
  text: {
    fontSize: 15,
    margin: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 3
  },
  inputfocus: {
    borderColor: '#211ebf',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    margin: 3
  },
  button: {
    borderRadius: 5,
    backgroundColor: "#2e6ef7",
    margin: 3,
    marginBottom: 15
  },
  button_2: {
    width: "48%",
    borderRadius: 5,
    backgroundColor: "#2e6ef7",
    margin: 3,
    marginBottom: 15
  },
  right: {
    borderRadius: 5,
    backgroundColor: "green",
    margin: 3,
    marginBottom: 15
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    padding: 12
  },

})