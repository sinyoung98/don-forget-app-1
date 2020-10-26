import React, { useEffect, useState } from 'react';
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
import axios from "axios";
import * as Linking from "expo-linking";


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
                                handleCount(item)
                            }}>
                                <Text style={styles.number}>{i + 1}</Text>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.titleDetailUrl }}
                                />
                                <Text style={styles.text}>{item.title}</Text>
                                <Text style={styles.click}>{item.artist} </Text>
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
        // justifyContent : "space-between",
        // flexWrap: 'wrap',
        // alignItems: 'flex-start',
        // position : "absolute", 
        padding: 10,
        // marginTop : 30
    },
    h1: {
        fontWeight: "800",
        fontSize: 20,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
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
    text: {
        fontSize: 14,
        marginTop: 20,
        fontSize: 14,
        fontWeight : "700"
        // width: "70%",
        // paddingLeft: 10
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
        height: 230
    },
    number: {
        backgroundColor: "red",
        padding: 20,
        opacity: 0.6,
        position: "absolute",
        top: "0%",
        fontSize: 30,
        zIndex: 5000,
        color: "white"
    },
    click: {
      position : "relative",
      fontWeight : "400",
    },
    price: {
        position : "absolute",
        left: "13%",
        bottom : "16%",
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
    }
})