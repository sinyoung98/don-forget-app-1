import React, { useEffect, useState } from "react"
import { View, Button, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Alert } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import Modify from "./Modify";

function SearchData({ id, navigation, useEffectSearch, setSearch }) {
  const [searchWord, setWord] = useState(null)
  const [searchData, setData] = useState([]);

  useEffect(() => {
    if (useEffectSearch) {
      handleSearch();
      setSearch(false);
    }
  })

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

  function handleModify(item) {
    console.log(item);
    navigation.navigate("Modify", { data: item })
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
        handleSearch();
      })
  }


  function handleSearch() {
    axios.post(`https://don-forget-server.com/search/${id}`, {
      data: searchWord
    })
      .then((res) => res.data)
      .then((data) => setData(data))
      .catch((err) => console.log("err!!"))
  }

  return (
    <View style={styles.container}>
      <Ionicons name="ios-search" size={20} style={styles.icon} />
      <TextInput
        style={searchWord ? styles.inputfocus : styles.input}
        onChangeText={text => setWord(text)}
        placeholder="날짜 혹은 이벤트 이름을 입력해주세요..."
        autoCapitalize="none"
        value={searchWord}
        placeholderTextColor="grey"
        onSubmitEditing={handleSearch}
      />
      <FlatList
        style={styles.flatList}
        data={searchData}
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
  );
}

const SearchStack = createStackNavigator();

export default function Search({ id, navigation }) {

  const [useEffectSearch, setSearch] = useState(false);


  return (
    <>
      <SearchStack.Navigator initialRouteName="SearchData">
        <SearchStack.Screen name="SearchData">
          {(props) => <SearchData {...props} id={id} useEffectSearch={useEffectSearch} setSearch={setSearch} />}
        </SearchStack.Screen>
        <SearchStack.Screen name="Modify" options={{ title: '스케쥴 추가하기' }} >
          {(props) => <Modify {...props} userId={id} setSearch={setSearch} />}
        </SearchStack.Screen>
      </SearchStack.Navigator>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    position: "relative",
    top: "5%",
    width: "90%",
    height: "8%",
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: "15%",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 10,
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
    top: "5%",
    width: "90%",
    height: "8%",
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: "15%",
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 10,
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
    position: "absolute",
    top: "11%",
    zIndex: 10,
    left: "10%"
  },
  flatList: {
    position: "relative",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    marginTop: 30
  }
})