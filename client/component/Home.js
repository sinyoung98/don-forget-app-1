import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Button, Text, Dimensions } from "react-native"
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar, Agenda } from 'react-native-calendars';

const Stack = createStackNavigator();
export default function Home() {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
      setUserData(JSON.parse(result));
    });
  })

  const vacation = { key: 'vacation', color: 'red' };
  const massage = { key: 'massage', color: 'blue' };
  const workout = { key: 'workout', color: 'green' };


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
      <Calendar
        style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}
        onDayPress={(day) => { console.log("selected day:", day.dateString) }}
        markingType={'multi-dot'}
        markedDates={{
          '2020-10-16': { selected: true, selectedColor: 'blue' },
          '2020-10-18': { dotColor: 'red', activeOpacity: 0 },
          '2020-10-25': { dots: [vacation, massage, workout], selected: true, selectedColor: 'grey' },
          '2020-10-26': {
            dots: [massage, workout],
            customStyles: {
              container: {
                backgroundColor: 'pink',
                borderColor: 'purple',
                borderWidth: 5,
              },
              text: {
                color: 'yellow',
              },
            },
          }
        }}
      />
    </View>
  );
}