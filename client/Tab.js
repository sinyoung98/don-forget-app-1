import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "./Home"
import Schdule from "./Schedule"
import Search from "./Search"
import Mypage from "./Mypage"


export default function Tab() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Schdule" component={Schdule} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Mypage" component={Mypage} />
        </Tab.Navigator>
    );
}