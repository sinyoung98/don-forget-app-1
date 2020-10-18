import React from "react"
import { View, Button, Text } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const ScheduleStack = createStackNavigator();


function schedule(){
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Schedule!</Text>
    </View>
  );
}


export default function Schedule() {
  return (
        <ScheduleStack.Navigator>
        <ScheduleStack.Screen name="Schedule" component={schedule}  options={{ title: 'Schedule' }} />
        </ScheduleStack.Navigator>
  )
}