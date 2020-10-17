
import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Button } from 'react-native';
import axios from "axios";
import { withTheme } from "react-native-elements";

export default function FindPW() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [id, getUserid] = useState("");

    function handleStepOne() {
        console.log("wow");
        console.log(email, name);
        axios.post('https://don-forget-server.com/user/findpassword/stepone', {
            name: name,
            email: email
        })
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
                setQuestion(data.password_question);
                setAnswer(data.password_answer);
                getUserid(data.id)
                console.log(question, answer, id);
            })
            .catch((err) => console.log(err))
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Step one</Text>
            <Text style={styles.text}>비밀번호를 찾고자 하는 아이디와 이름을 입력해주세요</Text>
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
                <Text style={styles.buttonText}>Next</Text>
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