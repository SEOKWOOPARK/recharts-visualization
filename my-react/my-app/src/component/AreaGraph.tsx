import * as React from 'react'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area
} from 'recharts'
import {ExcelType} from './AllGraph'

const AreaGraph:React.FC<{data: ExcelType[] | undefined}> = (props) => {
  const {useState, useEffect} = React

  return (
    <div>
      <h2>Area Graph For Analytics</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={props.data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <defs>
            <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884df" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884df" stopOpacity={0.2} />
            </linearGradient>
            <linearGradient id="colorImpression" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis name="id"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884df" fill="url(#colorCost)"/>
          <Area type="monotone" dataKey="weight" stackId="2" stroke="#82ca9d" fill="url(#colorImpression)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default AreaGraph

