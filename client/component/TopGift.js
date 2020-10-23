import React, { useEffect, useState } from 'react';
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet, TouchableOpacity, Alert, ScrollView, FlatList } from 'react-native';
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


    return (
        <View style={styles.container}>
            <Text style={styles.h1}>
                # 돈't forget 추천선물로 보는 Top 8
             </Text>
            <View style={styles.viewList}>
                {
                    topGiftList.map((item, i) => {
                        let title = item.title;
                        title = title.replaceAll("<b>", "#");
                        title = title.replaceAll("</b>", "");
                        return (
                            // <TouchableOpacity key={item.id} style={styles.list} onPress= { () => {
                            //     Linking.openURL(item.link)
                            // }}>
                             <TouchableOpacity key={item.id} style={styles.list} >
                                <Text style={styles.number}>{i + 1}</Text>
                                <Image
                                    style={styles.image}
                                    source={{ uri: item.image }}
                                />
                                <Text style={styles.text}>{title}</Text>
                                <Text style={styles.click}>조회수 {item.clickCount}</Text>
                                <Text style={styles.price}>{item.lprice} 원</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
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
        padding : 10,
        marginBottom : "30%"
    },
    h1: {
        fontWeight: "800",
        fontSize: 20,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 30,
        color : "black",
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
        fontWeight: "300",
        fontSize: 14,
        // width: "70%",
        // paddingLeft: 10
    },
    image: {
        position: "relative",
        width: 100,
        height: 100,
    },
    list: {
        position: "relative",
        margin: 10,
        width: "44%",
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
        padding: "8%",
        flexWrap: 'wrap',
        flexDirection: 'row',
        height : "55%"
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
        position: "absolute",
        left: "20%",
        bottom : "15%"
    },
    price: {
        bottom : "20%",
        // top: "20%",
        left: "0%",
        fontWeight: "700",
        fontSize : 20,
        marginTop : 10
    },
    viewList: {
        flexDirection: 'row',
        flex : 1,
        flexWrap:"wrap",
        // paddingHorizontal:16,
        // paddingTop:10,
        // justifyContent:"space-between",
        // paddingBottom:80,
    }
})
