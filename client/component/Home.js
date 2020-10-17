import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, TouchableOpacity, StyleSheet } from "react-native"
import moment, { Moment as MomentTypes } from 'moment';
import axios from "axios"

export default function Home() {

  // 유저 데이터({id, name, email})
  const [userData, setUserData] = useState(null);
  // 일정 받아오기
  const [data, setData] = useState(null);
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate._locale._months[selectedDate.month()])

  useEffect(() => {
    async function fetchData() {
      // 로그인 유저 데이터 받아오기
      await AsyncStorage.getItem("LOGIN_TOKEN", (err, result) => {
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
        console.log(data);
      })
  }

  useEffect(() => {
    // 선택한 날짜에 맞게 월 업데이트
    setMonth(selectedDate._locale._months[selectedDate.month()])
  });

  const generate = () => {
    // const today = moment();
    const today = selectedDate;
    console.log(today);
    console.log(month);
    const startWeek = today.clone().startOf('month').week();
    const endWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
    let calendar = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calendar.push(
        <View style={styles.row} key={week}>
          {
            Array(7).fill(0).map((n, i) => {
              let current = today.clone().week(week).startOf('week').add(n + i, 'day')
              let isSelected = today.format('YYYYMMDD') === current.format('YYYYMMDD') ? '_selected' : '';
              let isGrayed = current.format('MM') === today.format('MM') ? '' : '_grayed';
              let isSunday = (i === 0) ? '_sun' : '';
              let isSaturday = (i === 6) ? '_sat' : '';
              return (
                <TouchableOpacity
                  style={styles.box} key={i}
                  onPress={() => {
                    // 선택한 날짜로 이동
                    setSelectedDate(current)
                    console.log(i, `font${isSunday}${isSaturday}${isGrayed}`)
                  }}
                >
                  <View style={styles[`text${isSelected}`]}>
                    <Text style={styles[`font${isSunday}${isSaturday}${isGrayed}`]}>{current.format('D')}</Text>
                    <Text>
                      {/* 일정 유무 확인해서 <li>로 랜더 */}
                      {(data !== null) ?
                        data.map((obj) => {
                          if (obj.date !== null && obj.date.slice(0, 10) === current.format().slice(0, 10)) {
                            {/* console.log(current.format().slice(0, 10)); */ }
                            return (
                              <View key={obj.id} style={styles.line}>
                                <Text style={styles.line}>♥︎</Text>
                              </View>
                            )
                          }
                        })
                        : ""
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
        </View>
      )
    }
    return calendar;
  }

  return (<>
    <View style={styles.container}>
      <View style={styles.head}>
        {/* 화살표로 월 앞/뒤 이동 */}
        <TouchableOpacity style={styles.arrow}
          onPress={() => {
            let num = moment().month(month).format("M") - 2;
            setSelectedDate(moment().month(num).date(1))
          }}><Text>&lt;</Text></TouchableOpacity>
        <Text style={styles.title}>{month}</Text>
        <TouchableOpacity style={styles.arrow}
          onPress={() => {
            let num = moment().month(month).format("M");
            setSelectedDate(moment().month(num).date(1))
          }}><Text>&gt;</Text></TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.box}><Text style={styles.day}>SUN</Text></View>
        <View style={styles.box}><Text style={styles.day}>MON</Text></View>
        <View style={styles.box}><Text style={styles.day}>TUE</Text></View>
        <View style={styles.box}><Text style={styles.day}>WED</Text></View>
        <View style={styles.box}><Text style={styles.day}>THU</Text></View>
        <View style={styles.box}><Text style={styles.day}>FRI</Text></View>
        <View style={styles.box}><Text style={styles.day}>SAT</Text></View>
      </View>
      {generate()}
    </View>
  </>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    alignContent: "stretch",
    backgroundColor: "#fff"
  },
  head: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title: {
    padding: 7,
    fontSize: 20,
    fontWeight: "700",
    color: "#4a4a4a"
  },
  arrow: {
    fontSize: 25,
    fontWeight: "900",
    padding: 10,
    color: "#4a4a4a"
  },
  row: {
    flexDirection: 'row',
    display: "flex",
  },
  box: {
    flexBasis: "14.2%",
    alignContent: "stretch",
  },
  day: {
    fontSize: 12,
    alignSelf: "center",
    color: "grey"
  },
  text: {
    borderColor: "grey",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: 60,
    margin: 5,
    paddingHorizontal: 2,
    paddingVertical: 5
  },
  text_selected: {
    borderColor: "grey",
    borderWidth: 1,
    borderStyle: "solid",
    height: 60,
    margin: 5,
    paddingHorizontal: 2,
    paddingVertical: 5
  },
  font: {
    color: "#4a4a4a"
  },
  font_grayed: {
    color: "lightgrey"
  },
  font_sun_grayed: {
    color: "lightgrey"
  },
  font_sat_grayed: {
    color: "lightgrey"
  },
  font_sun: {
    color: "orange"
  },
  font_sat: {
    color: "royalblue"
  },
  line: {
    color: "red"
  }
})