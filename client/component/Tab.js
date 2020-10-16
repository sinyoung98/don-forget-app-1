import * as React from 'react';
import { useState } from "react";
import { Button, Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home"
import Schdule from "./Schedule"
import Search from "./Search"
import Mypage from "./Mypage"

const bottomTab = createBottomTabNavigator();


export default function Tab() {
    return (
        <NavigationContainer>
            <bottomTab.Navigator>
                <bottomTab.Screen name="Home" component={Home} />
                <bottomTab.Screen name="Schdule" component={Schdule} />
                <bottomTab.Screen name="Search" component={Search} />
                <bottomTab.Screen name="Mypage" component={Mypage} />
            </bottomTab.Navigator>
        </NavigationContainer>
    )
}
