import React, { useEffect, useState } from "react"
import { AsyncStorage, View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView } from "react-native"
import moment, { Moment as MomentTypes } from 'moment';
import axios from "axios"
import { Ionicons } from '@expo/vector-icons';

export default function Home() {

  // 유저 데이터({id, name, email})
  const [userData, setUserData] = useState(null);
  // 일정 받아오기
  const [data, setData] = useState(null);
  // 월 선택 모달
  const [openSelectMonth, setOpenSelectMonth] = useState(false)
  const [year, setYear] = useState(moment().year())
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(moment());
  const [month, setMonth] = useState(selectedDate._locale._months[selectedDate.month()]);
  // 하단 일정 창 오픈
  const [openSchedule, setOpenSchedule] = useState(false);
  

  //nextMonth
  const [nextMonth, setNext] = useState([]);
  const [isOpenNextMonth, setOpenNextMonth] = useState(true);

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
          getNextInfo(parse.id);
        })
    }
    fetchData();
  }, [])


  const getNextInfo = (id) => {
    axios.get(`https://don-forget-server.com/schedule/expectNextCost/${id}`)
    .then((res) => res.data)
    .then((data) => {
      console.log(data)
      setNext(data)
      console.log(nextMonth)
    })
    .catch((err)=> console.log("err!"))
  }

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
                    // 하단 일정 오픈
                    setOpenSchedule(true)
                  }}
                >
                  <View style={openSchedule ? styles[`top_dateBox${isSelected}${endWeek - startWeek + 1}`] : styles[`full_dateBox${isSelected}${endWeek - startWeek + 1}`]}>
                    <Text style={styles[`font${isSunday}${isSaturday}${isGrayed}`]}>{current.format('D')}</Text>
                    <Text style={{ flexDirection: "column", justifyContent: "flex-start", alignItems: 'stretch', }}>
                      {/* 일정 유무 확인해서 달력 위에 랜더 */}
                      {(data !== null) ?
                        data.map((obj) => {
                          if (obj.date !== null && obj.date.slice(0, 10) === current.format().slice(0, 10)) {
                            return (
                              <View key={obj.id} style={styles.line}>
                                <Text style={eventTypeColor[`${obj.type}`]}>•</Text>
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

  const monthModal = () => {
    return (<>
      <View style={{ padding: 15, width: "15%", alignItems: "center" }}></View>
      <TouchableOpacity style={{ padding: 15, width: "15%", alignItems: "center" }} onPress={() => setYear(year - 1)}><Text>&lt;</Text></TouchableOpacity>
      <View style={{ padding: 15, width: "40%", alignItems: "center" }}><Text>{year}</Text></View>
      <TouchableOpacity style={{ padding: 15, width: "15%", alignItems: "center" }} onPress={() => setYear(year + 1)}><Text>&gt;</Text></TouchableOpacity>
      <TouchableOpacity style={{ width: "15%", alignItems: "flex-end" }} onPress={() => setOpenSelectMonth(!openSelectMonth)}><Text>✕</Text></TouchableOpacity>

      <View style={styles.selectMonth_Line}></View>

      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(0).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>JAN</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(1).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>FEB</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(2).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>MAR</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(3).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>APR</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(4).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>MAY</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(5).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>JUN</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(6).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>JUL</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(7).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>AUG</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(8).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>SEP</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(9).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>OCT</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(10).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>NOV</Text></TouchableOpacity>
      <TouchableOpacity style={styles.selectMonth_Text} onPress={() => {
        setSelectedDate(moment().year(year).month(11).date(1));
        setOpenSelectMonth(!openSelectMonth);
      }}><Text>DEC</Text></TouchableOpacity>
    </>
    )
  }

  return (<ScrollView style={{ backgroundColor: "#fff", height: Dimensions.get('window').height }}>
    <View style={styles.calendar}>
      <View style={styles.head}>
        {/* 화살표로 월 앞/뒤 이동 */}
        <TouchableOpacity style={styles.arrow}
          onPress={() => {
            let num = moment().month(month).format("M") - 2;
            setSelectedDate(moment().month(num).date(1))
          }}><Text>&lt;</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setOpenSelectMonth(!openSelectMonth)}>
          <Text style={styles.title}>{month}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.arrow}
          onPress={() => {
            let num = moment().month(month).format("M");
            setSelectedDate(moment().month(num).date(1))
          }}><Text>&gt;</Text></TouchableOpacity>
      </View>
      
      <View style={isOpenNextMonth ? expect.content : styles.none}>
      <Ionicons name="ios-checkmark-circle-outline" size={20} color="#3b22a9" style={expect.icon}/>
        <Text style= {expect.text}> 다음달 {nextMonth[0]}개의 이벤트가 있어요!</Text>
        <Text style={expect.textTwo}> 지출 예상 금액 : {nextMonth[1]} 원</Text>
        <Text style={expect.textThree}> 지출 예상 선물 : {nextMonth[2]} 개</Text>
        <TouchableOpacity style={expect.close} onPress={() => setOpenNextMonth(false)}>
          <Text style={expect.closeBtn}>✕</Text>
        </TouchableOpacity>
        </View>
      {/* 월 선택 모달 */}
      <View style={openSelectMonth ? styles.selectMonth : styles.none}>
        {monthModal()}
      </View>

      <View style={styles.row}>
        <View style={styles.box}><Text style={styles.day, styles.sun}>SUN</Text></View>
        <View style={styles.box}><Text style={styles.day}>MON</Text></View>
        <View style={styles.box}><Text style={styles.day}>TUE</Text></View>
        <View style={styles.box}><Text style={styles.day}>WED</Text></View>
        <View style={styles.box}><Text style={styles.day}>THU</Text></View>
        <View style={styles.box}><Text style={styles.day}>FRI</Text></View>
        <View style={styles.box}><Text style={styles.day, styles.sat}>SAT</Text></View>
      </View>
      {generate()}
    </View>

    <View style={openSchedule ? styles.schedule : styles.none}>
      <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
        <Text style={styles.scheduleTitle}>{selectedDate.format("M[/]D[(]ddd[)]")}</Text>
        <TouchableOpacity style={{ padding: 12 }}
          onPress={() => setOpenSchedule(false)}>
          <Text style={styles.scheduleClose}>✕</Text>
        </TouchableOpacity>
      </View>
      {/* 일정 유무 확인해서 달력 하단에 랜더 */}
      <View style={styles.scheduleList}>
        {(data !== null) ?
          data.map((obj) => {
            if (obj.date !== null && obj.date.slice(0, 10) === selectedDate.format().slice(0, 10)) {
              return (
                <View key={obj.id}>
                  <Text style={styles.scheduleListEntry}>
                    <Text style={eventTypeColor[`${obj.type}`]}>{obj.giveandtake === "give" ? "|→ " : "|← "}</Text>
                    <Text style={styles.scheduleListEntry_name}>{obj.event_target} {obj.type}</Text>
                    <Text style={styles.scheduleListEntry_gift}>{obj.gift.slice(0, 2) === "선물" ?
                      " " + obj.gift.slice(3) : " ₩" + obj.gift.slice(3)}</Text>
                  </Text>
                </View>
              )
            }
          })
          : <Text></Text>
        }
      </View>
    </View>

  </ScrollView>)
}

const expect = StyleSheet.create({
  content : {
    backgroundColor : "rgba(59,35,166,.1)",
    borderRadius: 5,
    position : "relative",
    paddingLeft : 15,
    width : "100%",
    height : "15%",
    marginBottom : 15,
    marginTop: -5
  },
  text : {
    position : "absolute",
    top : "13%",
    left: "5%",
    fontWeight : "700",
    color : "#3b23a6",
    paddingLeft : 20,
  },
  icon : {
    position : "absolute",
    top : "10%",
    left: "4%"
  },
  close : {
    position : "absolute",
    right : "4%",
    top : "13%"
  },
  closeBtn: {
    color : "#3b23a6",
    fontSize: 17,
    fontWeight: "900"
  },
  textTwo: {
    fontSize: 12,
    paddingTop: 2,
    position : "absolute",
    top : "40%",
    left: "11%"
  },
  textThree: {
    fontSize: 12,
    paddingTop: 2,
    position : "absolute",
    top : "65%",
    left: "11%"
  }
})

const styles = StyleSheet.create({
  none: {
    display: "none"
  },
  calendar: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: "#fff",
    height: "auto"
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  title: {
    padding: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  arrow: {
    fontSize: 25,
    fontWeight: "900",
    padding: 20,
    color: "#4a4a4a"
  },
  row: {
    marginTop: 5,
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
  sun: {
    fontSize: 12,
    alignSelf: "center",
    color: "orange"
  },
  sat: {
    fontSize: 12,
    alignSelf: "center",
    color: "royalblue"
  },
  full_dateBox4: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 8,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  full_dateBox_selected4: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 8,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  full_dateBox5: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 10,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  full_dateBox_selected5: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 10,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  full_dateBox6: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 12,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  full_dateBox_selected6: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 12,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox4: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 11,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox_selected4: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 11,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox5: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 14,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox_selected5: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 14,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox6: {
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
    height: Dimensions.get('window').height / 16,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
  },
  top_dateBox_selected6: {
    // borderColor: "grey",
    // borderWidth: 1,
    // borderStyle: "solid",
    backgroundColor: "rgba(59,35,166,.1)",
    height: Dimensions.get('window').height / 16,
    marginTop: 5,
    paddingHorizontal: 2,
    paddingVertical: 5,
    paddingLeft: 5
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
    paddingVertical: 10,
  },


  schedule: {
    flex: 1,
    marginVertical: -5,
    marginHorizontal: 10,
    padding: 5,
    backgroundColor: "#fff",
    borderColor: "rgba(204, 204, 204, 0.6)",
    borderTopWidth: 1,
    borderStyle: "solid",
  },
  scheduleTitle: {
    padding: 10,
    paddingBottom: 15,
    fontSize: 20,
    fontWeight: "700",
    color: "#4a4a4a",
  },
  scheduleClose: {
    fontSize: 17
  },
  scheduleList: {
    // padding: 5,
    paddingLeft: 20
  },
  scheduleListEntry: {
    fontSize: 15,
    paddingBottom: 8
  },
  scheduleListEntry_name: {
    color: "#4a4a4a",
    fontWeight: "600"
  },
  scheduleListEntry_gift: {
    color: "slategray",
    fontSize: 13
  },

  selectMonth: {
    position: 'absolute',
    zIndex: 1,
    marginTop: 60,
    backgroundColor: "#ededed",
    color: "#4a4a4a",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30
  },
  selectMonth_Line: {
    width: "100%",
    borderTopColor: "#4a4a4a",
    borderTopWidth: 1,
  },
  selectMonth_Text: {
    padding: 15,
    width: "33.3%",
    alignItems: "center"
  }
})

const eventTypeColor = StyleSheet.create({
  결혼식: {
    fontWeight: "800",
    color: "#FFCECE"
  },
  생일: {
    fontWeight: "800",
    color: "#FFB65B"
  },
  장례식: {
    fontWeight: "800",
    color: "#737272"
  },
  집들이: {
    fontWeight: "800",
    color: "#6BACF8"
  },
  취직: {
    fontWeight: "800",
    color: "#FFF00C"
  },
  입학: {
    fontWeight: "800",
    color: "#A4F256"
  },
  출산: {
    fontWeight: "800",
    color: "#FF6666"
  },
  돌잔치: {
    fontWeight: "800",
    color: "#97ECCF"
  },
  기념일: {
    fontWeight: "800",
    color: "#E1C5FF"
  },
  기타: {
    fontWeight: "800",
    color: "#CECECE"
  }
})
