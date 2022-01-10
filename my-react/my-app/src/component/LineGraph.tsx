import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import React from 'react'

interface DummyData {
    name: string,
    Iphone: number
}

const data: Array<DummyData> = [
    {
      name: 'page A',
      Iphone: 17000,
    },
    {
      name: 'page B',
      Iphone: 1000,
    },
    {
      name: 'page C',
      Iphone: 4000,
    },
    {
      name: 'page D',
      Iphone: 0,
    },
    {
      name: 'page E',
      Iphone: 1500
    },
  ]

  function LineGraph() {
      return (
        <div>
        <h2>Line Graph Analytics</h2>
        <ResponsiveContainer width="90%" aspect={3} >
        <LineChart
          width={100}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid stroke="#243240" strokeDasharray="3 3" />
            {/* <XAxis dataKey="name" tick={{fill: "#fff"}} /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip contentStyle={{backgroundColor: "#8884d8", color: "#fff"}} itemStyle={{color: "#fff"}} cursor={false} />
            {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
            <Line 
              type="monotone" 
              dataKey="Iphone" 
              strokeWidth="5" 
              stroke="#8884df"
              dot={{fill: "#2e4355", stroke: "#8884d8", strokeWidth: 2, r: 3}}
              activeDot={{fill:"#2e4355",stroke:"#8884d8", strokeWidth: 5, r:10}}
            />
        </LineChart>
      </ResponsiveContainer>
      </div>
      )
  }

  export default LineGraph