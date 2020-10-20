import { LineChart, BarChart, DotContent } from "react-native-chart-kit";
import { Dimensions, View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Chart(props) {

  const { id } = props;
  const [money, setMoney] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [gift, setGift] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    axios.get(`https://don-forget-server.com/schedule/statistics/${id}`)
      .then((res) => {
        const Year_Data = res.data;
        console.log('Year_Data: ', Year_Data);
        for (let month in Year_Data) {
          console.log('month: ', month);
          for (let i = 0; i < 12; i++) {
            if (Number(month) - 1 === i) {
              money[i] = Year_Data[month].money / 10000;
              gift[i] = Year_Data[month].gift * 10;
            }
          }
        }
        console.log("money:", money, 'gift:', gift);
        setMoney(money);
        setGift(gift);
      })
  })


  return (
    <View>
      <LineChart
        data={{
          labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
          datasets: [
            {
              data: money,
              color: () => `mediumseagreen`,
            },
            {
              data: gift,
              color: () => `mediumpurple`,
            }
          ],
          legend: ["현금", "선물"]
        }}
        width={Dimensions.get("window").width * 0.95}
        height={256}
        withShadow={false}
        withDots={true}
        withScrollableDot={false} // 할까말까...
        // yAxisLabel="₩"
        yAxisSuffix="만원"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#fff000',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#fffffa',
          decimalPlaces: 0,
          linejoinType: "round",
          scrollableDotFill: '#fff',
          scrollableDotRadius: 4,
          scrollableDotStrokeColor: 'tomato',
          scrollableDotStrokeWidth: 3,
          scrollableInfoViewStyle: {
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'grey',
            yAxisSuffix: "만원",
            borderRadius: 2,
            marginTop: 25,
            marginLeft: 25
          },
          scrollableInfoTextStyle: {
            fontSize: 10,
            color: '#C4C4C4',
            marginHorizontal: 2,
            flex: 1,
            textAlign: 'center',
          },
          scrollableInfoSize: { width: 30, height: 30 },
          scrollableInfoOffset: 15,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          color: (opacity = 1) => `rgb(78, 135, 210, ${opacity})`,
          style: {
            borderRadius: 16,
            borderLeftWidth: 50,
            borderStyle: 'solid',
          }
        }
        }
        style={{
          margin: 8,
          borderRadius: 8,
        }}
      />
    </View>
  )
}
;

export default Chart;