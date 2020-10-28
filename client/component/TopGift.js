import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import axios from "axios";
import * as Linking from "expo-linking";


export default function TopGift() {
  //top 8 선물 요청 

  useEffect(() => {
    axios.get(`https://don-forget-server.com/gift/recommandGift`)
      .then((res) => {
        console.log(res.data);
        return res.data
      })
      .then((data) => setTopList(data));
  }, [])

  const [topGiftList, setTopList] = useState([]);

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
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>
        # 돈't forget 추천선물로 보는 Top 8
             </Text>
      <View style={styles.viewList}>
        {topGiftList.map((item, i) => {
          let title = item.title;
          title = title.replace(/<b>/gi, "");
          title = title.replace(/<\/b>/gi, "");
          const price = new Intl.NumberFormat().format(Number(item.lprice))
          if (title.length >= 22) {
            title = title.slice(0, 22) + "..."
          }
          return (
            <TouchableOpacity key={item.id} style={styles.list} onPress={() => {
              Linking.openURL(item.link);
              handleCount(item)
            }}>
              <View style={styles.ranking}>
                <Text style={styles.number}>{i + 1}</Text>
              </View>
              <Image style={styles.image} source={{ uri: item.image }} />
              <Text style={styles.text}>{title}</Text>
              <Text style={styles.price}>{price}원</Text>
              <Text style={styles.click}>조회수 {item.clickCount}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  h1: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#4a4a4a",
  },
  text: {
    fontSize: 14,
    marginTop: 10,
    fontSize: 14
  },
  image: {
    position: "relative",
    width: "100%",
    height: 120,
    borderRadius: 10
  },
  list: {
    position: "relative",
    margin: 5,
    width: "47%",
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: 250
  },
  ranking: {
    backgroundColor: "red",
    padding: 15,
    opacity: 0.6,
    position: "absolute",
    top: "0%",
    zIndex: 5000,
    borderTopLeftRadius: 10
  },
  number: {
    fontSize: 20,
    fontWeight: "600",
    zIndex: 5000,
    color: "white",
  },
  click: {
    position: "absolute",
    fontWeight: "400",
    bottom: "10%",
    left: "13%",
    color: "grey"
  },
  price: {
    position: "absolute",
    left: "13%",
    bottom: "16%",
    fontWeight: "700",
    fontSize: 20,
    marginTop: 10,
    color: "darkblue",
    opacity: 0.7,
    marginBottom: 7
  },
  viewList: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 50
  }
})
