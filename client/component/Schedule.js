import React, { useEffect, useState } from "react"
import { View, Button, Text, StyleSheet, FlatList, Alert } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
import ScheduleAdd from "./ScheduleAdd"
import Modify from "./Modify"

function GetSchedule({ id, navigation, update, setUpdate }) {
  const [data, setData] = useState([]);
  const [curData, setCurData] = useState("");

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
   

  function handleRemove(item){
    console.log(item)
    axios.delete(`https://don-forget-server.com/schedule/${id}`,{
      params : {
        schedule_id : item
      }
    })
    .then((res) => res.data)
    .then(() => {
      console.log(data);
      setUpdate(true);
    })
  }

  function handleModify(item) {
    console.log(item);
    navigation.navigate("Modify", { data: item})
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

  console.log(data);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon} onPress={() => {
        navigation.navigate("ScheduleAdd")
      }}>
        <Ionicons name="ios-add-circle-outline" size={40} />
      </TouchableOpacity>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text style={styles.date}>{(item.date).slice(5, 7)} / {(item.date).slice(8, 10)}</Text>
            <TouchableOpacity style={styles.list} onPress={() => {
              createAlert(item);
            }}>
              <Text style={styles[item.type]}>{item.giveandtake === "give" ? "|→ " : "|← "}</Text>
              <Text style={styles.text}>{item.event_target} {item.type}</Text>
              <Text style={styles.gift}>{item.gift.slice(0, 2) === "선물" ?
                " " + item.gift.slice(3) : " ₩" + item.gift.slice(3)}</Text>
            </TouchableOpacity>
          </>)}
      />
    </View>
  )
}

const ScheduleStack = createStackNavigator();

export default function Schedule({ id }) {
  //데이터가 변경되면 reload
  const [update, setUpdate] = useState(true);

  return (
    <>
      <ScheduleStack.Navigator initialRouteName="GetSchedule">
        <ScheduleStack.Screen name="GetSchedule" options={{ title: 'Schedule' }} >
          {(props) => <GetSchedule {...props} id={id} setUpdate={setUpdate} update={update} />}
        </ScheduleStack.Screen>
        <ScheduleStack.Screen name="ScheduleAdd" options={{ title: '스케쥴 추가하기' }} >
          {(props) => <ScheduleAdd {...props} id={id} setUpdate={setUpdate} />}
        </ScheduleStack.Screen>
        <ScheduleStack.Screen name="Modify" options={{ title: '스케쥴 추가하기' }} >
          {(props) => <Modify {...props} userId={id} setUpdate={setUpdate} />}
        </ScheduleStack.Screen>
      </ScheduleStack.Navigator>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: "white"
  },
  list: {
    position: "relative",
    margin: 10,
    width: "95%",
    borderBottomWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 10,
    shadowRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    padding: 10,
    paddingLeft: 20,
    elevation: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: "8%"
  },
  생일: {
    fontSize: 20,
    color: "#FFB65B",
    fontWeight: "800",
  },
  결혼식: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFCECE"
  },
  장례식: {
    fontSize: 20,
    fontWeight: "800",
    color: "#737272"
  },
  집들이: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6BACF8"
  },
  취직: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF00C"
  },
  입학: {
    fontSize: 20,
    fontWeight: "800",
    color: "#A4F256"
  },
  돌잔치: {
    fontSize: 20,
    fontWeight: "800",
    color: "#97ECCF"
  },
  기념일: {
    fontSize: 20,
    fontWeight: "800",
    color: "#E1C5FF"
  },
  기타: {
    fontSize: 20,
    fontWeight: "800",
    color: "#CECECE"
  },
  text: {
    fontSize: 17,
    paddingLeft: 10,
    fontWeight: "600"
  },
  gift: {
    position: "absolute",
    left: "80%",
    top: "100%",
    fontSize: 15,
    color: "grey"
  },
  date: {
    fontWeight: "700",
    fontSize: 16,
  },
  icon: {
    fontSize: 10,
    position: "relative",
    left: "80%",
    top: "20%"
  }
})