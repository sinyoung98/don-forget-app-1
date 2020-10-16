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


const BottomTab = createBottomTabNavigator();

function Tabs() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Schedule" component={Schdule} />
      <BottomTab.Screen name="Search" component={Search} />
      <BottomTab.Screen name="Mypage" component={Mypage} />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
