import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./Home";
import Intro from './component/Intro';
import Signin from './component/Signin';

//ver 4.x
// 전환하게 될 컴포넌트 등록
// const Stack = createStackNavigator({
//   "Intro": { screen: Intro },
//   "Signin": { screen: Signin },
// }, {
//   // 맨 처음에 띄울 페이지
//   intialRouteName: "Intro"
// })

// version 4.x: createStackNavigator()에 객체로 screen을 설정,
// key=스크린 이름(변수) / value=컴포넌트 이름

// version 5.x: <Stack.Screen>을 통해 각각의 스크린을 설정
// name=스크린 이름(변수) / component=컴포넌트 이름
const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={Intro} options={{ title: 'Don-forget' }} />
        <Stack.Screen name="Signin" component={Signin} options={{ title: 'Login' }} />

        {/* 로그인 후 페이지 이동 테스트용 */}
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


// 로그인전에 인트로,로그인,회원가입 하나의 스택으로있고 
// 로그인전에는 탭 display none, 탭에 로그인버튼 없고 인트로페이지에 따로
// 탭 위에 있는 스택은 
