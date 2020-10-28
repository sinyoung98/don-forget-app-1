import React, { useState, useEffect } from 'react';
import { AsyncStorage, Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Button } from "react-native"
import axios from "axios";
import Chart from './Mypage_Chart';
import { StackActions } from "@react-navigation/native";
import email from 'react-native-email';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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

  const exportEmail = async () => {
    const list = [];
    await axios.get(`https://don-forget-server.com/schedule/${userData.id}`)
      .then(res => {
        res.data.map(element => {
          // console.log("element:", element);
          list.push({
            "날짜": element.date,
            "경조사 종류": element.type,
            "경조사 대상": element.event_target,
            "선물 또는 현금": element.gift[1],
            "give 또는 take": element.giveandtake
          })
        })
      })

    console.log("list:", list)

    const emailAddress = `${userData.email}`;
    let to = emailAddress
    if (emailAddress.includes('-')) {
      to = emailAddress.split('-')[1];
    } else {
      to = emailAddress
    }

    email(to, {
      subject: '내 경조사 기록',
      body: JSON.stringify(list, null, "\t")
    }).catch(console.error)
  }


  return (
    <ScrollView style={{ backgroundColor: "#fff", height: Dimensions.get('window').height, flexDirection: "column" }}>
      <Text style={styles.title}>경조사 지출 통계</Text>
      {userData !== null ? <>
        <Chart id={userData.id} />

        <View style={styles.export}>
          <Text style={styles.exportTitle} onPress={exportEmail}>경조사 기록 이메일로 내보내기</Text>
          <Icon style={styles.exportIcon} name="email-multiple" />
        </View>

        <View style={styles.userInfo}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.info}>사용자 정보</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.name}>이름 : </Text>
              {openName ? <>
                <TextInput placeholder="변경할 이름을 입력해주세요." autoCapitalize="none"
                  style={styles.input} onChangeText={text => setChangeName(text)} />
                <TouchableOpacity onPress={changeNameHandler}>
                  <Text style={{ paddingHorizontal: 10, paddingVertical: 5 }}>✔︎</Text>
                </TouchableOpacity>
              </> :
                <Text style={styles.name}>{userData.name}</Text>
              }
            </View>
            <Text style={styles.name} >이메일 : {userData.email}</Text>
          </View>

          <View style={styles.buttonGroup}>
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
      </> : <></>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  title: {
    margin: 25,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  export: {
    flexDirection: 'row-reverse',
  },
  exportTitle: {
    fontWeight: "600",
    color: "#3b23a6",
    textDecorationLine: 'underline',
    paddingRight: 20
  },
  exportIcon: {
    fontWeight: "600",
    color: "#3b23a6",
    fontSize: 15
  },
  userInfo: {
    backgroundColor: "#eeedf7",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 20,
    margin: 15,
    marginTop: 5,
  },
  name: {
    color: "#72717a",
    fontSize: 14,
    fontWeight: "700",
    marginVertical: 5
  },
  input: {
    width: 200,
    borderColor: '#c5c5c5',
    borderWidth: 1,
    borderRadius: 5,
    color: "#72717a",
    fontSize: 14,
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  button: {
    borderRadius: 10,
    backgroundColor: "#8888ff",
    padding: 0,
    marginLeft: 10,
  },
  button_text: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
    fontSize: 10,
    fontWeight: "800"
  },
  info: {
    color: "#624EB8",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 'auto'
  }
})