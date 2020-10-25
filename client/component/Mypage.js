import React, { useState, useEffect } from 'react';
import { AsyncStorage, Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import axios from "axios";
import Chart from './Mypage_Chart';
import { StackActions } from "@react-navigation/native"

export default function Mypage({ navigation }) {

  // 유저 데이터({id, name, email})
  const [userData, setUserData] = useState(null);

  const [openName, setOpenName] = useState(false);
  const [changeName, setChangeName] = useState("");

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

  const signoutHandler = () => {
    axios.post('https://don-forget-server.com/user/signout', {})
      .then(() => { AsyncStorage.clear() })
      .then(() => {
        navigation.replace("Signin");
      })
      .catch((err) => console.log(err));
  }

  const changeNameHandler = () => {
    axios.post(`https://don-forget-server.com/user/changename/${userData.id}`, {
      name: changeName
    })
      .then((res) => {
        let data = res.data;
        let newData = userData;
        newData.name = data.name;

        console.log("newData:", newData)
        setUserData(newData)
        setOpenName(!openName)
      })
      .catch((err) => console.log(err));
  }

  return (
    <View style={{ backgroundColor: "#fff", height: Dimensions.get('window').height, flexDirection: "column" }}>
      <Text style={styles.title}>경조사 지출 통계</Text>
      {userData !== null ? <>
        <Chart id={userData.id} />

        <View style={styles.userInfo}>
          {openName ? <View style={{ flexDirection: "row" }}>
            <TextInput placeholder="변경할 이름을 입력해주세요." autoCapitalize="none"
              style={styles.input} onChangeText={text => setChangeName(text)} />
            <TouchableOpacity onPress={changeNameHandler}>
              <Text style={{ padding: 15 }}>✔︎</Text>
            </TouchableOpacity>
          </View> : <Text style={styles.name}>{userData.name}</Text>}
          <Text style={{ color: "#4a4a4a" }}>{userData.email}</Text>
        </View>
      </> : <></>}

      <View style={{ backgroundColor: "whitesmoke", flexDirection: "row", justifyContent: "space-between", marginTop: "auto", marginBottom: 160, paddingHorizontal: 40 }}>
        <TouchableOpacity style={styles.button} onPress={() => setOpenName(!openName)}>
          <Text style={styles.button_text}>이름 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("ChangePW") }}>
          <Text style={styles.button_text}>비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={signoutHandler}>
          <Text style={styles.button_text}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  title: {
    margin: 25,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  userInfo: {
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    padding: 30,
    margin: 15,
  },
  name: {
    color: "#4a4a4a",
    fontSize: 25,
    fontWeight: "700",
  },
  input: {
    width: 200,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 3
  },
  button: {
    borderRadius: 5,
    backgroundColor: "whitesmoke",
    margin: 5,
    padding: 4
  },
  button_text: {
    padding: 10,
    color: "#4a4a4a",
  },
})