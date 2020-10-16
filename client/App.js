import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Intro from "./component/Intro"
import Home from "./component/Home"
import Schdule from "./component/Schedule"
import Search from "./component/Search"
import Mypage from "./component/Mypage"
import Signin from "./component/Signin"
import Signup from "./component/Signup"

const BottomTab = createBottomTabNavigator();

function Tabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="home" component={Home} />
      <BottomTab.Screen name="schedule" component={Schdule} />
      <BottomTab.Screen name="search" component={Search} />
      <BottomTab.Screen name="mypage" component={Mypage} />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {setLoading(false)}, 3000)
  }, [])

  return (
    <>
    {isLoading ? <Intro /> :  <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="intro" component={Intro} style={styles.stackNavigation} options={{ title: 'Welcome' }}/>
        <Stack.Screen name="Signin" component={Signin} options={{ title: '로그인' }}/>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Signup" component={Signup} options={{ title: '회원가입' }}/>
      </Stack.Navigator>
    </NavigationContainer> }
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "blue"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
