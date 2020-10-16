import React, { useState } from "react"
import { AsyncStorage, View, Text, TextInput, Image, Button, StyleSheet} from 'react-native';
import axios from "axios";
import Logo from '../Logo.png';

export default function Signup(){
    return (
        <View style={styles.container}>
              <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>회원가입</Text>
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
    logo: {
      width: 50,
      height: 40,
    },
    title: {
      fontWeight: "500",
      fontSize: 25,
      margin: 10,
    },
    input: {
      width: 200,
      borderTopWidth: 0,
      borderLeftWidth : 0,
      borderRightWidth : 0,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 6,
      padding: 5,
      margin: 3,
    },
    inputfocus : {
      borderTopWidth: 0,
      borderLeftWidth : 0,
      borderRightWidth : 0,
      width: 200,
      borderColor: 'blue',
      borderWidth: 1,
      borderRadius: 6,
      padding: 5,
      margin: 3
    }
  })