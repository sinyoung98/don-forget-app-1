import React, { useState, useEffect } from 'react';
import { AsyncStorage, Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import axios from "axios";

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
      .then(() => navigation.navigate("Signin"))
      .catch((err) => console.log(err));
  }

  const changeNameHandler = () => {
    console.log(changeName);
    axios.post(`https://don-forget-server.com/user/changename/${userData.id}`, {
      name: changeName
    })
      .then((res) => {
        let data = res.data; //{name: newname}
        let newData = userData;
        newData.name = data.name;

        console.log("newData:", newData)
        setUserData(newData)
        setOpenName(!openName)
      })
      .catch((err) => console.log(err));
  }

  return (
    <ScrollView style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
      <Text style={styles.title}>Mypage</Text>
      {userData !== null ?
        <View style={styles.userInfo}>
          <Text>User Info:</Text>
          {openName ? <>
            <TextInput placeholder="변경할 이름을 입력해주세요." autoCapitalize="none"
              onChangeText={text => setChangeName(text)}></TextInput>
            <TouchableOpacity onPress={changeNameHandler}><Text>✔︎</Text></TouchableOpacity>
          </> : <Text>{userData.name}</Text>}
          <Text>{userData.email}</Text>
        </View> : <></>}

      <TouchableOpacity onPress={() => setOpenName(!openName)}><Text>이름 변경</Text></TouchableOpacity>
      <TouchableOpacity onPress={signoutHandler}><Text>로그아웃</Text></TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  title: {
    margin: 20,
    marginBottom: 0,
    fontSize: 30,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  userInfo: {
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    padding: 20,
    margin: 15,
  }
})