import { LineChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native"
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Chart(props) {

  const { id } = props;
  const [money, setMoney] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [gift, setGift] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [data, setData] = useState({
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
  })

  useEffect(() => {
    axios.get(`https://don-forget-server.com/schedule/statistics/${id}`)
      .then((res) => {
        const Year_Data = res.data;
        console.log('Year_Data: ', Year_Data);
        for (let month in Year_Data) {
          for (let i = 0; i < 12; i++) {
            if (Number(month) - 1 === i) {
              money[i] = Year_Data[month].money / 10000;
              gift[i] = Year_Data[month].gift * 5;
            }
          }
        }
        // console.log("money:", money, 'gift:', gift);
        setMoney(money);
        setGift(gift);
        setData({
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
        })
      })
  }, [])

  return (
    <View>
      <LineChart
        data={data}
        width={Dimensions.get("window").width * 0.98}
        height={256}
        withShadow={false}
        withDots={true}
        yAxisSuffix="만원"
        chartConfig={{
          backgroundColor: '#fff000',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#fffffa',
          decimalPlaces: 0,
          linejoinType: "round",
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          color: (opacity = 1) => `rgb(78, 135, 210, ${opacity})`,
        }}
        style={{
          margin: 0,
        }}
        bezier
      />
    </View>
  )
};

export default Chart;