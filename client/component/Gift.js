import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import TopGift from "./TopGift";

export default function Gift({ navigation, useEffectSearch, setSearch }) {

  const [userData, setUserData] = useState(null);
  const [keyword, setKeyword] = useState(null)
  const [data, setData] = useState([]);

  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "취직 축하 선물", "수능 응원"]

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

  useEffect(() => {
    if (useEffectSearch) {
      handleSearch();
      setSearch(false);
      handleTagSearch();
    }
  })

  function handleSearch() {
    console.log(keyword)
    axios.post(`https://don-forget-server.com/search/${userData.id}`, {
      data: keyword
    })
      .then((res) => res.data)
      .then((data) => setData(data))
      .then(() => console.log(data))
      .catch((err) => console.log("err!!"))
  }
  function handleTagSearch(tag) {
    console.log(tag)
    axios.post(`https://don-forget-server.com/search/${userData.id}`, {
      data: tag
    })
      .then((res) => res.data)
      .then((data) => setData(data))
      .then(() => console.log(data))
      .catch((err) => console.log("err!!"))
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchbar}>
        <Ionicons name="ios-search" size={20} color={"grey"} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={text => setKeyword(text)}
          placeholder={`선물을 검색해주세요`}
          autoCapitalize="none"
          value={keyword}
          placeholderTextColor="grey"
          onSubmitEditing={handleSearch}
        />
      </View>
      <View style={styles.tags}>
        {tags.map((tag, i) => {
          return (<TouchableOpacity key={i} style={styles.tag_btn}
            onPress={() => {
              handleTagSearch(tag)
            }}><Text style={styles.tag_Text}>{tag}</Text></TouchableOpacity>)
        })}
      </View>
     <TopGift/>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    width: "100%",
  },
  icon: {
    position: "absolute",
    zIndex: 2,
    marginBottom: 10,
    marginTop: 40,
    paddingLeft: "13%",
  },
  input: {
    zIndex: 1,
    width: "90%",
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    paddingLeft: "15%",
    marginBottom: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
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
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 25
  },
  tag_btn: {
    margin: 4,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "grey",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
  },
  tag_Text: {
    fontSize: 12,
    color: "#4a4a4a",
    paddingVertical: 5,
    paddingHorizontal: 10,

  },
})