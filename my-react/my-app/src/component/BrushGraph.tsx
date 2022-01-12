import * as React from 'react'
import { ExcelType } from './AllGraph'
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  Brush,
  Legend,
  ReferenceLine,
  CartesianGrid
 } from 'recharts'

const BrushGraph: React.FC<{data: ExcelType[] | undefined}> = (props) => {
  return (
    <div>
      <h2>Graph For Analytics</h2>
      <BarChart
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
        <Brush dataKey="id" height={35} stroke="#8884d8" />
        <Bar dataKey="sales" fill="url(#colorCost)" />
        <Bar dataKey="weight" fill="url(#colorImpression)" />
      </BarChart>


    </div>
  )
}

export default BrushGraph