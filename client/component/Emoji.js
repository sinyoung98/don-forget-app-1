import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Clipboard } from 'react-native';
import axios from "axios";
import * as Linking from "expo-linking";
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function Emoji() {
  //top 8 이모지 요청

  useEffect(() => {
    axios.get(`https://don-forget-server.com/gift/imoticonList`)
      .then((res) => {
        console.log(res.data);
        return res.data
      })
      .then((data) => setTopList(data.items));
  }, [])

  const [topEmojiList, setTopList] = useState([]);
  const [copied, setCopied] = useState(false);

  const createAlert = (item) =>
    Alert.alert("", `클립보드 복사하기`,
      [
        { text: "Copy", onPress: () => Clipboard.setString(`https://e.kakao.com/t/${item.titleUrl}`) }
      ],
      { cancelable: false }
    );


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.h1}>
        # 카카오톡 이모티콘 Top 10
             </Text>
      <View style={styles.viewList}>
        {
          topEmojiList.map((item, i) => {
            return (
              // <TouchableOpacity key={item.id} style={styles.list} onPress= { () => {
              //     Linking.openURL(item.link)
              // }}>
              <TouchableOpacity key={i} style={styles.list} onPress={() => {
                Linking.openURL(`https://e.kakao.com/t/${item.titleUrl}`);
              }}>
                <View style={styles.ranking}>
                  <Text style={styles.number}>{i + 1}</Text>
                </View>
                <Image
                  style={styles.image}
                  source={{ uri: item.titleDetailUrl }}
                />
                <Text style={styles.text}>{item.title}</Text>
                <Text style={styles.click}>{item.artist} </Text>
                <TouchableOpacity style={styles.copy}>
                  <Text style={styles.copy} onPress={() => {
                    createAlert(item);
                  }}>Copy</Text>
                  <Icon name="content-copy" style={styles.copyIcon}></Icon>
                </TouchableOpacity>
              </TouchableOpacity>
            )
          })
        }
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
    marginTop: 15,
    fontSize: 14,
  },
  image: {
    position: "relative",
    width: "100%",
    height: 140,
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
    height: 230
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
    position: "relative",
    fontWeight: "400",
    color: "grey"
  },
  viewList: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: "wrap",
    marginBottom: 50
  },
  copy: {
    position: "absolute",
    fontSize: 13,
    right: 15,
    bottom: 8,
    color: "grey",
  },
  copyIcon: {
    position: "absolute",
    right: -1,
    color: "grey",
    fontSize: 14,
    top: -23
  }
})
