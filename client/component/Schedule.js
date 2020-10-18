import React, { useEffect, useState } from "react"
import { View, Button, Text, StyleSheet, FlatList } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";




// function schedule({ id }) {
//   useEffect(() => {
//     axios.get(`https://don-forget-server.com/schedule/${id}`)
//   }, [])
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Schedule!</Text>
//     </View>
//   );
// }


export default function Schedule({ id }) {
  const [data, setData] = useState([]);

  function getSchedule() {
    axios.get(`https://don-forget-server.com/schedule/${id}`)
      .then((res) => res.data)
      .then((info) => {
        info = info.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        console.log(info);
        setData(info);
        console.log(`data는`, data[0].date);
      })
      .catch((err) => console.log("err!!!"))
  }

  useEffect(() => {
    getSchedule();
  }, []);

  console.log(data);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <>
        <Text>{(item.date).slice(5, 7)} / {(item.date).slice(8, 10)}</Text>
        <TouchableOpacity style={styles.list}>
        <Text style={styles[item.type]}>{item.giveandtake === "give" ? "→" : "←"}</Text>
          <Text >{item.type}</Text>
          <Text>{item.event_target}</Text>
          <Text>{item.gift}</Text>
        </TouchableOpacity>
        </>)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position : "absolute",
    width : "95%",
    top : "10%",
  },
  list: {
    position : "relative",
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

    elevation: 7,
  },
  생일 : {
    color: "#FFB65B",
    borderLeftWidth : 20,
    borderLeftColor :  "#FFB65B",
  },
  결혼식 : {
    color: "#FFCECE"
  },
  장례식 :{
    color: "#737272"
  },
  집들이 : {
    color: "#737272"
  },
  취직 : {
    color: "#737272"
  }, 
  입학 : {
    color: "#737272"
  },
  돌잔치 : {
    color: "#737272"
  },
  기념일 : {
    color: "#737272"
  },
  기타 : {
    color: "#737272"
  }
})