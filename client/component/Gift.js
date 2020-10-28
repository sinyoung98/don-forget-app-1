import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList, Image } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import TopGift from "./TopGift";
import * as Linking from "expo-linking";
import Emoji from "./Emoji"

export default function Gift({ navigation, useEffectSearch, setSearch }) {

  const [userData, setUserData] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("")
  const [searchData, setSearchData] = useState([]);

  //4개씩 렌더링하기 
  const [preItems, setPreItems] = useState(0);
  const [items, setItems] = useState(4);

  const tags = ["20대 여자 생일 선물", "30대 남자 생일 선물", "입학 선물", "30대 여자 집들이 선물", "설 선물", "출산용품", "결혼 선물", "수능 응원", "카카오톡 이모티콘 순위"]
  const [kakaoEmoji, setEmoji] = useState(false);
  const [curTag, setCurTag] = useState("");

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

  // useEffect(() => {
  //   if (useEffectSearch) {
  //     handleSearch();
  //     setSearch(false);
  //     handleTagSearch();
  //   }
  // })

  function handleSearch() {
    console.log(searchKeyword)
    axios.post(`https://don-forget-server.com/gift/find/?text=${searchKeyword}`)
      .then((res) => res.data)
      .then((data) => {
        setSearchData(searchData.concat(data.slice(preItems, items)));
        console.log(searchData);
        setPreItems(preItems + 4);
        setItems(items + 4);
      })
      .catch((err) => console.log("err!!"))
  }

  function handleTagSearch(tag) {

    if (tag === "카카오톡 이모티콘 순위") {
      setEmoji(!kakaoEmoji);
    }
    else {
      axios.post(`https://don-forget-server.com/gift/find/?text=${tag}`)
        .then((res) => res.data)
        .then((data) => {
          setSearchData(searchData.concat(data.slice(preItems, items)));
          console.log(searchData);
          setPreItems(preItems + 4);
          setItems(items + 4);
        })
        .then(() => setSearchKeyword(tag))
        .catch((err) => console.log("err!!"))
    }
  }

  function handleCount(item) {
    const { title, link, image, lprice, hprice, mallName, productId, productType, brand, maker, category1, category2, category3, category4 } = item;
    axios.post(`https://don-forget-server.com/gift/clickProduct`, {
      category1: category1,
      category2: category2,
      category3: category3,
      category4: category4,
      maker: maker,
      brand: brand,
      productType: productType,
      productId: productId,
      mallName: mallName,
      hprice: hprice,
      lprice: lprice,
      image: image,
      link: link,
      title: title
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err))
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchbar}>
        <Ionicons name="ios-search" size={20} color={"grey"} style={styles.icon} />
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setPreItems(0);
            setItems(4);
            setSearchData([]);
            setSearchKeyword(text);
            setCurTag("");
          }}
          placeholder={`선물을 검색해주세요`}
          autoCapitalize="none"
          value={searchKeyword}
          placeholderTextColor="grey"
          onSubmitEditing={() => {
            setPreItems(0);
            setItems(4);
            setSearchData([]);
            handleSearch();
          }}
        />
      </View>
      <View style={searchKeyword !== "" ? styles.none : styles.tags}>
        {tags.map((tag, i) => {
          return (<TouchableOpacity key={i} style={curTag === tag ? styles.curTag_btn : styles.tag_btn}
            onPress={() => {
              if (curTag === tag) {
                setCurTag("");
              } else {
                setCurTag(tag);
              }
              handleTagSearch(tag);
            }}><Text style={curTag === tag ? styles.curTag_Text : styles.tag_Text}>{tag}</Text></TouchableOpacity>)
        })}
      </View>
      {
        searchKeyword !== "" ?
          <FlatList
            // style={listStyles.flatlist}
            numColumns={2}
            data={searchData}
            renderItem={(item) => {
              let title = item.item.title;
              title = title.replace(/<b>/gi, "");
              title = title.replace(/<\/b>/gi, "");
              if (title.length >= 24) {
                title = title.slice(0, 24) + "..."
              }
              const price = new Intl.NumberFormat().format(Number(item.item.lprice))
              return (
                <TouchableOpacity key={item.index} style={listStyles.list} onPress={() => {
                  Linking.openURL(item.item.link);
                  handleCount(item.item);
                }}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.item.image }}
                  />
                  <Text style={listStyles.text}>{title}</Text>
                  <Text style={listStyles.price}>{price}원</Text>
                  <Text style={{
                    fontSize: 12, left: 2,
                    color: "grey"
                  }}>{item.item.category1}</Text>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item.index}
            onEndReached={handleSearch}
            onEndReachedThreshold={0.5}
          // onScrollEndDrag = {handleSearch}
          />
          : (kakaoEmoji ? <Emoji /> : <TopGift />)
      }
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between'
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
    paddingLeft: 25,
    marginBottom: "3%"
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
  curTag_btn: {
    margin: 4,
    backgroundColor: "#547eff",
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
  curTag_Text: {
    fontSize: 12,
    color: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tag_Text: {
    fontSize: 12,
    color: "#4a4a4a",
    paddingVertical: 5,
    paddingHorizontal: 10,

  },
  image: {
    position: "relative",
    height: 140,
    borderRadius: 10
  },
  none: {
    display: "none"
  }
})


const listStyles = StyleSheet.create({
  list: {
    position: "relative",
    margin: 9,
    width: "45%",
    padding: "2%",
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
  },
  flatlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginBottom: 50
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    fontSize: 14,
    // width: "70%",
    // paddingLeft: 10
  },
  price: {
    left: "2%",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 10,
    color: "darkblue",
    opacity: 0.7,
    marginBottom: 7,
  },
})