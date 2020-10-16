import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import Logo from '../Logo.png';

function Intro({ navigation }) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} alt="Logo_don-forget" />
      <Text style={styles.title}>돈't forget</Text>
      {/* <Text style={styles.desc} multiline={true}>laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium</Text> */}
    </View>
  )
};
export default Intro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 80,
  },
  title: {
    fontWeight: "900",
    fontSize: 25,
    margin: 10,
  },
  desc: {
    width: 300,
  },
});

