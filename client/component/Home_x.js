import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, Dimensions } from "react-native"
import { Calendar, Agenda } from 'react-native-calendars';
import axios from "axios"

function Home(props) {

  // 유저 데이터({id, name, email})
  const [userData, setUserData] = useState(null);
  // 일정 받아오기
  const [data, setData] = useState(null);
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(null);
  // 날짜 선택 및 일정 표시 용
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    async function fetchData() {
      // 로그인 유저 데이터 받아오기
      let result = await AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
        setUserData(JSON.parse(result));
      })
        .then((result) => {
          console.log("result:", JSON.parse(result));
          let parse = JSON.parse(result);
          getSchedule(parse.id);
        })
    }
    fetchData();
  }, [])

  const getSchedule = (id) => {
    axios.get(`https://don-forget-server.com/schedule/${id}`)
      .then((res) => {
        let data = res.data;
        data = data.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        setData(data);

        data.forEach((obj) => {
          console.log(obj);
          if (markedDates[`${obj.date.slice(0, 10)}`]) {
            markedDates[`${obj.date.slice(0, 10)}`].dots = [obj.type];
          }
          markedDates[`${obj.date.slice(0, 10)}`] = { dots: [obj.type] };
        })
      })
  }

  const 장례식 = { key: '장례식', color: 'red' };
  const 생일 = { key: '생일', color: 'orange' };
  const 결혼식 = { key: '결혼식', color: 'pink' };

  const selectDateHandler = (day) => {
    const { dateString } = day;

    // markedDates 객체에 키로 날짜가 "2020-10-16" 형식으로 들어감
    if (!markedDates[`${dateString}`]) {
      markedDates[`${dateString}`] = { selected: true };
    } else {
      markedDates[`${dateString}`].selected = true
    }
    // 이전에 선택되어있던 날짜 false로 바꾸기
    for (let key in markedDates) {
      if (key !== dateString) {
        if (markedDates[key].selected) {
          markedDates[key].selected = false
        }
      }
    }
    setMarkedDates(markedDates);
    setSelectedDate(dateString);

    console.log("markedDates:", markedDates)
  };

  const renderSchedule = () => {
    // console.log(data)
    if (data) {
      data.map((obj) => {
        let text = `${obj.date.slice(0, 10)} ${obj.event_target} ${obj.gift}`
        console.log(text)
        return (
          <View style={{ margin: 10 }}>
            <Text>{text}</Text>
          </View>
        )
      })
    }
  }

  return (
    <View>
      {userData === null ? <></>
        : <>
          {/* 레퍼런스 번역: https://velog.io/@kim-macbook/10%EC%9D%BC%EC%B0%A8-wixreact-native-calendars-%EB%AC%B8%EC%84%9C-%EB%B2%88%EC%97%AD */}
          <Calendar
            style={{
              width: Dimensions.get('window').width,
              // height: Dimensions.get('window').height,
              padding: 15
            }}
            theme={{
              arrowColor: "grey",
              todayTextColor: 'orange',
              textMonthFontWeight: '600',
            }}
            monthFormat={'MMMM'}
            current={selectedDate}
            onDayPress={selectDateHandler}
            markingType={'multi-dot'}
            markedDates={markedDates}
          />
        </>
      }

      {renderSchedule()}

    </View>
  );
}

// export default Home;