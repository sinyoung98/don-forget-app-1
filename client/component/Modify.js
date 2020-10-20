import React, { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from "react-native"
import ModalDatePicker from 'react-native-datepicker-modal'
import { Ionicons } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import { StackActions } from "@react-navigation/native";
import axios from "axios";

export default function Modify({ navigation, route, userId, setUpdate, setSearch }) {

    console.log(userId);
    const { date, event_target, gift, giveandtake, id, type } = route.params.data;

    const [selectDate, setDate] = useState(date);
    const [giveandTake, setGiveandTake] = useState(giveandtake);
    const [eventTarget, setTarget] = useState(event_target);
    const [eventType, setType] = useState(type);
    const [giftType, setGiftType] = useState(gift[0]);
    const [content, setContent] = useState(gift[1]);


    const createEmailAlert = () =>
        Alert.alert(
            "",
            "수정 또는 삭제하기",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );

    function handleModifySchedule() {
        if (selectDate && eventTarget && eventType && giftType && content) {
            console.log(id);
            console.log(` date:`, selectDate,
                `event_type:`, eventType,
                ` event_target:`, eventTarget,
                `  gift:`, [giftType, content],
                `giveandtake:`, giveandTake)
            axios.put(`https://don-forget-server.com/schedule/${userId}`, {
                date: selectDate,
                type: eventType,
                event_target: eventTarget,
                gift: [giftType, content],
                giveandtake: giveandTake
            }, {
                params: {
                    schedule_id: id
                }
            })
                .then((res) => res.data)
                .then((data) => {
                    console.log(data);
                    if (setUpdate) {
                        setUpdate(true);
                        navigation.navigate("GetSchedule");
                    }
                    else {
                        setSearch(true);
                        navigation.navigate("SearchData");
                    }
                })
                .catch((err) => console.log("err!!!"))

        } else {
            createEmailAlert();
        }

    }


    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.8} style={giveandTake === "give" ? styles.giveandtake : styles.button} onPress={() => setGiveandTake("give")}>
                <Text style={giveandTake === "give" ? styles.giveandtakeText : styles.buttonText}>Give?</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={giveandTake === "take" ? styles.giveandtake : styles.button} onPress={() => setGiveandTake("take")}>
                <Text style={giveandTake === "take" ? styles.giveandtakeText : styles.buttonText}>Take?</Text>
            </TouchableOpacity>
            <ModalDatePicker style={dateStyles.container}
                renderDate={({ year, month, day, date }) => {
                    if (!date) {
                        return (<>
                            <Text style={[dateStyles.text, dateStyles.placeholderText]}>
                                {selectDate.slice(0, 10)}</Text>
                            <Ionicons name="ios-calendar" size={25} style={dateStyles.icon} />
                        </>)
                    } else {
                        const dateStr = `${year}-${month}-${day}`
                        setDate(dateStr);
                        console.log(dateStr);
                        return (
                            <>
                                <Text style={dateStyles.text}>{dateStr}
                                </Text>
                                <Ionicons name="ios-calendar" size={25} style={dateStyles.icon} />
                            </>
                        )
                    }
                }} />
            <TextInput
                style={eventTarget ? styles.inputfocus : styles.input}
                onChangeText={text => setTarget(text)}
                placeholder="경조사 대상(사람 이름) *"
                autoCapitalize="none"
                value={eventTarget}
                placeholderTextColor="grey"
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.select}>
                <RNPickerSelect
                    placeholder={{
                        label: eventType,
                        value: eventType,
                    }}
                    placeholderTextColor="black"
                    onValueChange={(value) => setType(value)}
                    items={[
                        { label: '생일', value: '생일', key: 1 },
                        { label: '결혼식', value: '결혼식', key: 2 },
                        { label: '장례식', value: '장례식', key: 3 },
                        { label: '집들이', value: '집들이', key: 3 },
                        { label: '취직', value: '취직', key: 3 },
                        { label: '입학', value: '입학', key: 3 },
                        { label: '출산', value: '출산', key: 3 },
                        { label: '돌잔치', value: '돌잔치', key: 3 },
                        { label: '기념일', value: '기념일', key: 3 },
                        { label: '기타', value: '기타', key: 3 },
                    ]}
                />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.selectType}>
                <RNPickerSelect
                    placeholder={{
                        label: giftType,
                        value: giftType,
                    }}
                    placeholderTextColor="black"
                    onValueChange={(value) => setGiftType(value)}
                    items={[
                        { label: '현금', value: '현금', key: 1 },
                        { label: '선물', value: '선물', key: 2 },
                    ]}
                />
            </TouchableOpacity>
            <TextInput
                style={content ? styles.inputfocus : styles.input}
                onChangeText={text => setContent(text)}
                placeholder="주거나 받은 내역 *"
                autoCapitalize="none"
                value={content}
                placeholderTextColor="grey"
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={() => {
                navigation.dispatch(
                    StackActions.popToTop()
                );
            }}>
                <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleModifySchedule}>
                <Text style={styles.buttonText}>수정하기</Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ede3e3",
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: "8%",
    },
    title: {
        position: "absolute",
        top: "13%",
        fontWeight: "500",
        fontSize: 20,
        margin: 10,
        color: "#2e6ef7"
    },
    input: {
        position: "relative",
        top: "-5%",
        width: "80%",
        height: "8%",
        borderColor: 'black',
        borderWidth: 1,
        padding: "3%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 10,
        marginTop: 20
    },
    inputfocus: {
        position: "relative",
        top: "-5%",
        width: "80%",
        height: "8%",
        borderColor: '#211ebf',
        borderWidth: 1,
        padding: "3%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 10,
        marginTop: 20
    },
    button: {
        position: "relative",
        width: "40%",
        height: "7%",
        borderRadius: 5,
        backgroundColor: "white",
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        marginTop: 60,
        marginLeft: 10,
        top: "30%"
    },
    buttonText: {
        color: "black",
        textAlign: "center",
        padding: 10
    },
    text: {
        position: "relative",
        top: "-11%",
        fontSize: 15,
        margin: 20,
        marginBottom: 30,
    },
    link: {
        position: "relative",
        top: "11%",
        left: "-25%",
        color: "#4c52f7",
        fontSize: 13,
        marginTop: 10
    },
    registor_link: {
        position: "relative",
        top: "-90%",
        left: "30%",
        color: "#4c52f7",
        fontSize: 13,
        marginTop: 10
    },
    select: {
        position: "relative",
        borderBottomWidth: 1,
        width: "80%",
        marginTop: 30,
        padding: "3%"
    },
    selectType: {
        position: "relative",
        width: "80%",
        borderBottomWidth: 1,
        marginTop: 10,
        padding: "3%",
        borderRadius: 4
    },
    contentInput: {
        position: "relative",
        top: "-5%",
        width: "57%",
        height: "8%",
        borderColor: 'black',
        borderWidth: 1,
        padding: "3%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 10
    },
    contentInputFocus: {
        position: "relative",
        top: "-5%",
        width: "57%",
        height: "8%",
        borderColor: '#211ebf',
        borderWidth: 1,
        padding: "3%",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        marginBottom: 10
    },
    giveandtake: {
        position: "relative",
        width: "40%",
        height: "7%",
        borderRadius: 5,
        backgroundColor: "#0636c9",
        shadowRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        marginTop: 60,
        marginLeft: 10,
        top: "30%"
    },
    giveandtakeText: {
        color: "white",
        textAlign: "center",
        padding: 10
    }
})


const dateStyles = StyleSheet.create({
    container: {
        position: "relative",
        width: "80%",
        borderRadius: 4,
        height: "10%",
        borderBottomWidth: 1,
        margin: 20
    },
    placeholderText: {
        color: "gray"
    },
    text: {
        width: '100%',
        fontSize: 15,
        color: "gray",
        padding: "6%"
    },
    icon: {
        position: "absolute",
        left: "80%",
        top: "20%"
    }
})