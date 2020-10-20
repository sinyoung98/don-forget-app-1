import { LineChart, BarChart, } from "react-native-chart-kit";
import { Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import React, { useState } from 'react';
import axios from 'axios';

function Chart(props) {

  const { id } = props;
  const [money, setMoney] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  const data = [
    { name: '1월', gift: 0, money: 0 },
    { name: '2월', gift: 0, money: 0 },
    { name: '3월', gift: 0, money: 0 },
    { name: '4월', gift: 0, money: 0 },
    { name: '5월', gift: 0, money: 0 },
    { name: '6월', gift: 0, money: 0 },
    { name: '7월', gift: 0, money: 0 },
    { name: '8월', gift: 0, money: 0 },
    { name: '9월', gift: 0, money: 0 },
    { name: '10월', gift: 0, money: 0 },
    { name: '11월', gift: 0, money: 0 },
    { name: '12월', gift: 0, money: 0 },
  ];

  axios.get(`https://don-forget-server.com/schedule/statistics/${id}`)
    .then((res) => {
      const Year_Data = res.data;
      console.log('Year_Data : ', Year_Data);
      for (let month in Year_Data) {
        console.log('month : ', month);
        for (let i = 0; i < money.length; i++) {
          if (Number(month) - 1 === i) {
            money[i] = Year_Data[month].money;
          }
        }
      }
      console.log("money:", money)
      setMoney(money)
    })

  return (
    <View>
      <LineChart
        data={{
          labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
          datasets: [
            {
              data: money,
              color: () => `green`,
            },
            {
              data: [0, 2, 3, 0, 0, 0, 0, 3, 1, 200000, 0, 0],
              color: () => `blue`,
            }
          ],
          legend: ["현금", "선물"]
        }}
        width={Dimensions.get("window").width}
        height={256}
        yAxisLabel="₩"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        style={{
          margin: 8,
          borderRadius: 8
        }}
      />
    </View>
  )
}
;

export default Chart;