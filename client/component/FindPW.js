
import React, { useState } from "react"
import { AsyncStorage, Alert, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button, } from 'react-native';
import axios from "axios";
import { withTheme } from "react-native-elements";
import { StackActions } from "@react-navigation/native";

export default function FindPW({ navigation }) {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    const createError = () => {
        Alert.alert(
            "⚠️ Error",
            "이메일 또는 이름이 일치하지 않습니다",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        )
    }

    function handleStepOne() {
        axios.post('https://don-forget-server.com/user/findpassword/stepone', {
            name: name,
            email: email
        })
            .then((response) => response.data)
            .then((data) => {
                console.log("response data ; ", data);
                navigation.dispatch(
                    StackActions.replace(`FindPwTwo`, { question: data.password_question, answer: data.password_answer, id: data.id })
                );
            })
            .catch((err) => console.log(err))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>비밀번호 찾기 1단계</Text>
            <Text style={styles.text}>비밀번호를 찾고자 하는 이메일과 이름을 입력해주세요.</Text>
            <TextInput
                style={email ? styles.inputfocus : styles.input}
                onChangeText={text => setEmail(text)}
                placeholder="don-forget 이메일"
                autoCapitalize="none"
                value={email}
            />
            <TextInput
                style={name ? styles.inputfocus : styles.input}
                onChangeText={text => setName(text)}
                placeholder="don-forget 이름"
                autoCapitalize="none"
                value={name}
            />
            <TouchableOpacity activeOpacity={0.8} style={styles.button} onPress={handleStepOne}>
                <Text style={styles.buttonText}>다음</Text>
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
        marginBottom: 5
    },
    inputfocus: {
        position: "relative",
        top: "-5%",
        width: "80%",
        height: "8%",
        borderColor: '#211ebf',
        borderWidth: 1,
        padding: "3%",
        marginBottom: 5
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