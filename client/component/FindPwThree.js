import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import axios from "axios";
import { withTheme } from "react-native-elements";
import { StackActions } from "@react-navigation/native";
import { Route } from "react-router-dom";


export default function FindPwThree({ navigation, route }) {
    const [password, setPassword] = useState("")
    const [pwCheck, setpwCheck] = useState("")

    const createEmailAlert = () =>
        Alert.alert(
            "⚠️ Error",
            "비밀번호가 일치하지 않습니다",
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

    function handleStepThree() {
        if ((password === pwCheck) && (password !== "")) {
            axios.post("https://don-forget-server.com/user/findpassword/resetpassword", {
                password: password,
                id: route.params.id
            })
                .then((res) => console.log(res.data))
                .then(() => {
                    navigation.dispatch(StackActions.popToTop());
                    navigation.dispatch(
                        StackActions.replace(`Signin`)
                    )
                })
        }
        else {
            createEmailAlert();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>비밀번호 재설정</Text>
            <Text style={styles.text}>새 비밀번호를 입력해주세요</Text>
            <TextInput
                style={password ? styles.inputfocus : styles.input}
                onChangeText={text => setPassword(text)}
                placeholder="New password *"
                autoCapitalize="none"
                value={password}
            />
            <TextInput
                style={pwCheck ? styles.inputfocus : styles.input}
                onChangeText={text => setpwCheck(text)}
                placeholder="New password Check*"
                autoCapitalize="none"
                value={pwCheck}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleStepThree}>
                <Text style={styles.buttonText}>비밀번호 재설정하기</Text>
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
        borderColor: '#c5c5c5',
        borderWidth: 1,
        padding: "3%",
    },
    inputfocus: {
        position: "relative",
        top: "-5%",
        width: "80%",
        height: "8%",
        borderColor: '#211ebf',
        borderWidth: 1,
        padding: "3%",
    },
    button: {
        position: "relative",
        top: "2%",
        width: "80%",
        height: "7%",
        borderRadius: 5,
        backgroundColor: "#2e6ef7"
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        padding: 12
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
})