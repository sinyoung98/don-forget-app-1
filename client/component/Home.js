import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Button, Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Intro from './Intro';
import Signin from './Signin';

const Stack = createStackNavigator();
export default function Home() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
      setUserData(JSON.parse(result));
    });
  })

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      {userData === null ? <></>
        : <>
          <Text>↓userData 확인!↓</Text>
          <Text>{userData.id}</Text>
          <Text>{userData.name}</Text>
          <Text>{userData.email}</Text>
        </>
      }
    </View>
  );
}