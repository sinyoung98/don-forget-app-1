import * as React from 'react';
import { useState } from "react";
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

<<<<<<< HEAD
import Home from "./Home";
import Intro from './component/Intro';
import Signin from './component/Signin';
=======
>>>>>>> 0ba6e9f3e504600be3d2184b46d5f4a4aa96e89b





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
  return (
    <NavigationContainer>
<<<<<<< HEAD
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} options={{ title: 'Don-forget' }} />
        <Stack.Screen name="Signin" component={Signin} options={{ title: 'Login' }} />

        {/* 로그인 후 페이지 이동 테스트용 */}
        <Stack.Screen name="Home" component={Home} />
=======
      <Stack.Navigator initialRouteName="intro">
        <Stack.Screen name="intro" component={Intro} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Tabs" component={Tabs} />
>>>>>>> 0ba6e9f3e504600be3d2184b46d5f4a4aa96e89b
      </Stack.Navigator>
    </NavigationContainer>
  );
}
<<<<<<< HEAD


// 로그인전에 인트로,로그인,회원가입 하나의 스택으로있고 
// 로그인전에는 탭 display none, 탭에 로그인버튼 없고 인트로페이지에 따로
// 탭 위에 있는 스택은 
=======
>>>>>>> 0ba6e9f3e504600be3d2184b46d5f4a4aa96e89b
