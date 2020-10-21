import * as React from 'react';
import { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Intro from "./component/Intro"
import Home from "./component/Home"
import Schdule from "./component/Schedule"
import Search from "./component/Search"
import Gift from "./component/Gift"
import Mypage from "./component/Mypage"
import Signin from "./component/Signin"
import Signup from "./component/Signup"
import FindPW from "./component/FindPW"
import FindPwTwo from "./component/FindPwTwo"
import FindPwThree from "./component/FindPwThree"
import ChangePW from "./component/Mypage_ChangePw"
import { Ionicons } from '@expo/vector-icons';
import Schedule from './component/Schedule';

const BottomTab = createBottomTabNavigator();



function getHeaderTitle(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name // 현재 active된 route name을 tab navigator에서 가져온다
    : route.params?.screen || 'Home';

  return routeName;
}

const MypageTab = createStackNavigator();

function MypageTabScreen() {
  return (
    <MypageTab.Navigator>
      <MypageTab.Screen name="Mypage" component={Mypage} />
      <MypageTab.Screen name="ChangePW" component={ChangePW} options={{ title: '비밀번호 변경' }} />
    </MypageTab.Navigator>
  )
}

function Tabs({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  }, [navigation, route]);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    async function getId() {
      await AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        return result;
      })
        .then((result) => {
          console.log(result);
          let parse = JSON.parse(result);
          setUserId(parse.id);
        })
    }
    getId();
  }, [])


  return (
    <BottomTab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'ios-home'
            : 'ios-home';
        } else if (route.name === 'Schedule') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (route.name === 'Gift') {
          iconName = 'ios-search'
        } else if (route.name === 'Mypage') {
          iconName = "ios-contact"
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={{
        activeTintColor: '#3b23a6',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: "white",//color you want to change
        }
      }}>
      <BottomTab.Screen name="Home" component={Home} />
      <BottomTab.Screen name="Schedule">
        {(props) => <Schedule {...props} id={userId} />}
      </BottomTab.Screen>
      <BottomTab.Screen name="Gift" component={Gift} />
      <BottomTab.Screen name="Mypage" component={MypageTabScreen} />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator();


export default function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 3000)
  }, [])



  return (
    <>
      {isLoading ? <Intro /> : <NavigationContainer>
        <Stack.Navigator initialRouteName="Signin">
          <Stack.Screen name="intro" component={Intro} style={styles.stackNavigation} options={{ title: 'Welcome' }} />
          <Stack.Screen name="Signin" component={Signin} options={{ title: '로그인' }} />
          <Stack.Screen name="Tabs" component={Tabs} options={({ route }) => ({ // point!!!!!!
            headerTitle: getHeaderTitle(route),
            headerStyle: {
              opacity: 0.8,
              backgroundColor: "#1702ff"
            },
            headerTitleStyle: {
              color: 'white',
              fontWeight: "800"
            }
          })} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: '회원가입' }} />
          <Stack.Screen name="FindPW" component={FindPW} options={{ title: '비밀번호 찾기' }} />
          <Stack.Screen name="FindPwTwo" component={FindPwTwo} options={{ title: '비밀번호 찾기' }} />
          <Stack.Screen name="FindPwThree" component={FindPwThree} options={{ title: '비밀번호 찾기' }} />
        </Stack.Navigator>
      </NavigationContainer>}
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
