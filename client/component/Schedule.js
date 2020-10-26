import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, FlatList, Alert, Image, Linking, TextInput, SafeAreaView } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import axios from "axios";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, Zocial } from '@expo/vector-icons';
import ScheduleAdd from "./ScheduleAdd";
import Modify from "./Modify";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Icon from 'react-native-vector-icons/Feather';


function GetSchedule({ id, navigation, update, setUpdate, isSearch, setSearch }) {
  const [data, setData] = useState([]);

  const [searchWord, setWord] = useState(null);
  const [searchData, setSearchData] = useState([]);

  const tags = ["생일", "결혼식", "장례식", "집들이", "취직", "입학", "출산", "돌잔치", "기념일", "기타"]

  useEffect(() => {
    if (isSearch) {
      console.log(searchWord);
      handleSearch();
      setSearch(false);
    }
  })

  const otherBanks = () =>
    Alert.alert(
      "은행 선택",
      "",
      [
        {
          text: "우리은행",
          onPress: () => Linking.openURL("SmartBank2WIB://"),
        },
        {
          text: "신한은행",
          onPress: () => Linking.openURL("sbankmoasign://")
        },
        {
          text: "취소",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },

      ],
    );


  const createAlert = (item) =>
    Alert.alert(
      "추가 및 삭제",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
          style: "cancel"
        },
        {
          text: "Edit", onPress: () => {
            handleModify(item);
          }
        },
        {
          text: "Remove",
          onPress: () => {
            handleRemove(item.id);
          }
        },
      ],
      { cancelable: false }
    );


  function handleSearch() {
    axios.post(`https://don-forget-server.com/search/${id}`, {
      data: searchWord
    })
      .then((res) => res.data)
      .then((data) => setSearchData(data))
      .catch((err) => console.log("err!!"))
  }

  function handleRemove(item) {
    console.log(item)
    axios.delete(`https://don-forget-server.com/schedule/${id}`, {
      params: {
        schedule_id: item
      }
    })
      .then((res) => res.data)
      .then(() => {
        console.log(data);
        setUpdate(true);
        setSearch(true);
      })
  }

  function handleModify(item) {
    console.log(item);
    navigation.navigate("Modify", { data: item })
  }

  function getSchedule() {
    axios.get(`https://don-forget-server.com/schedule/${id}`)
      .then((res) => res.data)
      .then((info) => {
        info = info.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        return info
      })
      .then((info) => {
        setData(info);
      })
      .catch((err) => console.log("err!!!"))
  }

  useEffect(() => {
    if (update) {
      getSchedule();
      setUpdate(false);
    }
  });

  function handleTag(tag) {
    console.log(tag);
    setWord(tag)
    axios.post(`https://don-forget-server.com/search/${id}`, {
      data: tag
    })
      .then((res) => res.data)
      .then((data) => setSearchData(data))
      .catch((err) => console.log("err!!"))
  }


  console.log(data);
  return (
    <View style={styles.container}>
      <Ionicons name="ios-search" size={20} style={inputStyles.icon} />
      <TextInput
        style={searchWord ? inputStyles.inputfocus : inputStyles.input}
        onChangeText={text => setWord(text)}
        placeholder="날짜 또는 경조사 종류를 입력하세요."
        autoCapitalize="none"
        value={searchWord}
        placeholderTextColor="grey"
        onSubmitEditing={handleSearch}
      />
      <View style={tagStyles.tag}>
        {
          tags.map((tag, i) => {
            return (
              <TouchableOpacity key={i} onPress={() => {
                handleTag(tag);
              }}>
                <Text style={tagStyles[tag]}>#{tag}</Text></TouchableOpacity>
            )
          })
        }
      </View>
          <FlatList
            data={data}
            style={searchWord === "" || searchWord === null ? styles.flatlist : styles.none}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <>
                <TouchableOpacity style={styles.list} onPress={() => {
                  createAlert(item);
                }}>
                  <Text style={styles.date}>{(item.date).slice(5, 7)} / {(item.date).slice(8, 10)} </Text>
                  <Text style={styles[item.type]}>{item.giveandtake === "give" ? "|→ " : "|← "}</Text>
                  <Text style={styles.text}>{item.event_target}</Text>
                  <Text style={styles.textType}>{item.type}</Text>
                  <Text style={styles.gift}>{item.gift[0] === "선물" ?
                    " " + item.gift[0] : " ₩" + new Intl.NumberFormat().format(Number(item.gift[1])) }</Text>
                </TouchableOpacity>
              </>)}
          />
  
      <FlatList
        data={searchData}
        style={searchWord === "" ? styles.none : styles.flatlist}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity style={styles.list} onPress={() => {
              createAlert(item);
            }}>
              <Text style={styles.date}>{(item.date).slice(5, 7)} / {(item.date).slice(8, 10)} </Text>
              <Text style={styles[item.type]}>{item.giveandtake === "give" ? "|→ " : "|← "}</Text>
              <Text style={styles.text}>{item.event_target}</Text>
              <Text style={styles.textType}>{item.type}</Text>
              <Text style={styles.gift}>{item.gift[0] === "선물" ?
                " " + item.gift[0] : " ₩ " + item.gift[1]}</Text>
            </TouchableOpacity>
          </>)}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.addButton} onPress={() => {
          navigation.navigate("ScheduleAdd")
        }}>
          <Text style={styles.addButtonAction}>경조사 추가하기</Text>
        </TouchableOpacity>
      </View>
      <ActionButton style={styles.actionBtn} buttonColor="#3b23a6" renderIcon={active => active ? (<Icon name="plus" style={styles.actionButtonIcon} />) : (<Icon name="won" style={styles.actionButtonIcon} />)}>
        <ActionButton.Item buttonColor='rgb(254, 228, 9)' title="카카오뱅크" onPress={() => Linking.openURL("kakaobank://")}>
          <Image style={styles.kakao} source={require('../../client/kakaobank_app.png')} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='rgb(246, 246, 246)' title="토스" onPress={() => Linking.openURL("supertoss://")}>
          <Image style={styles.toss} source={require('../../client/toss_app.png')} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="기타 은행" onPress={() => { otherBanks(); }}>
          <Icon style={styles.others} name="ellipsis-h" />
        </ActionButton.Item>
      </ActionButton>
    </View>

  )
}

const ScheduleStack = createStackNavigator();

export default function Schedule({ id }) {
  //데이터가 변경되면 reload
  const [update, setUpdate] = useState(true);

  //search 동기화
  const [isSearch, setSearch] = useState(false);
  return (
    <>
      <ScheduleStack.Navigator initialRouteName="GetSchedule">
        <ScheduleStack.Screen name="GetSchedule" options={{ title: 'Schedule' }} >
          {(props) => <GetSchedule {...props} id={id} setUpdate={setUpdate} update={update} isSearch={isSearch} setSearch={setSearch} />}
        </ScheduleStack.Screen>
        <ScheduleStack.Screen name="ScheduleAdd" options={{ title: '스케쥴 추가하기' }} >
          {(props) => <ScheduleAdd {...props} id={id} setUpdate={setUpdate} />}
        </ScheduleStack.Screen>
        <ScheduleStack.Screen name="Modify" options={{ title: '스케쥴 추가하기' }} >
          {(props) => <Modify {...props} userId={id} setUpdate={setUpdate} isSearch={isSearch} setSearch={setSearch} />}
        </ScheduleStack.Screen>
      </ScheduleStack.Navigator>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "white",
  },
  list: {
    position: "relative",
    margin: 10,
    marginTop: 1,
    width: "95%",
    borderBottomWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    paddingLeft: 20,
    elevation: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: "4%",
  },
  생일: {
    fontSize: 15,
    color: "#FFB65B",
    fontWeight: "800",
  },
  결혼식: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFCECE"
  },
  장례식: {
    fontSize: 15,
    fontWeight: "800",
    color: "#737272"
  },
  집들이: {
    fontSize: 15,
    fontWeight: "800",
    color: "#6BACF8"
  },
  취직: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FFF00C"
  },
  입학: {
    fontSize: 15,
    fontWeight: "800",
    color: "#A4F256"
  },
  돌잔치: {
    fontSize: 15,
    fontWeight: "800",
    color: "#97ECCF"
  },
  기념일: {
    fontSize: 15,
    fontWeight: "800",
    color: "#E1C5FF"
  },
  기타: {
    fontSize: 15,
    fontWeight: "800",
    color: "#CECECE"
  },
  출산: {
    fontSize: 15,
    fontWeight: "800",
    color: "#FF6666"
  },
  text: {
    fontSize: 15,
    paddingTop: 3,
    paddingLeft: 10,
    fontWeight: "600"
  },
  gift: {
    position: "relative",
    left: "90%",
    top: "100%",
    fontSize: 15,
    color: "grey"
  },
  date: {
    fontWeight: "300",
    fontSize: 15,
    position: "relative",
    top: "50%"
  },
  addButtonAction: {
    fontSize: 15,
    padding: 15,
    fontWeight: "500",
    color: "#3b23a6",
    // position : "relative",
    // top : "80%",
    // left : "-70%"
  },
  addButton: {
    backgroundColor: "rgba(59, 35, 166, 0.1)",
    // borderColor: "#3b23a6",
    // borderWidth: 0.3,
    borderRadius: 10,
    width: "278%",
    height: "30%",
    alignItems: "center",
    // shadowRadius: 0,
    // shadowColor: "#fff",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0,
    // shadowRadius: 0,
    marginTop: 10,
  },
  textType: {
    position: "relative",
    fontSize: 15,
    paddingLeft: 10,
    paddingTop: 3,
    fontWeight: "300",
  },
  actionBtn: {
    position: "relative",
    top: "28%",
    left: "3%"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  kakao: {
    height: 40,
    width: 40
  },
  toss: {
    height: 50,
    width: 50
  },
  others: {
    fontSize: 25,
    color: "white"
  },
  none: {
    display: "none"
  },
  flatlist: {
    position: "absolute",
    height: "70%",
    width: "100%",
    top: "42%"
  },
  buttons: {
    position: "relative",
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: "6%",
    left: "1%",
  }

})


const inputStyles = StyleSheet.create({
  input: {
    position: "relative",
    top: "-3%",
    left : "3%",
    width: "93%",
    height: "8%",
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: "15%",
    // marginBottom: 10,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "white",
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  inputfocus: {
    position: "relative",
    top: "-3%",
    left : "3%",
    width: "93%",
    height: "8%",
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: "15%",
    // marginBottom: 10,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: "white",
    color: "black",
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  icon: {
    position: "relative",
    top: "6.5%",
    left: "10%",
    zIndex : 4000
  },
})


const tagStyles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  생일: {
    fontSize: 13.5,
    color: "#FFB65B",
    fontWeight: "800",
    paddingLeft: 18
  },
  결혼식: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#FFCECE",
    paddingLeft: 18
  },
  장례식: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#737272",
    paddingLeft: 18
  },
  집들이: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#6BACF8",
    paddingLeft: 18
  },
  취직: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#FFF00C",
    paddingLeft: 18
  },
  입학: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#A4F256",
    paddingLeft: 18,
  },
  돌잔치: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#97ECCF",
    paddingLeft: 18,
    paddingTop: 5
  },
  기념일: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#E1C5FF",
    paddingLeft: 18,
    paddingTop: 5
  },
  기타: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#CECECE",
    paddingLeft: 18,
    paddingTop: 5
  },
  출산: {
    fontSize: 13.5,
    fontWeight: "800",
    color: "#FF6666",
    paddingLeft: 18,
    paddingTop: 5
  },
})