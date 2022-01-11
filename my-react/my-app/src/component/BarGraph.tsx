import * as React from 'react'
import {
  BarChart,
  CartesianGrid,
  YAxis,
  XAxis,
  Legend,
  Tooltip,
  Bar
} from 'recharts'
import { ExcelType } from './AllGraph'

const BarGraph = (props: {data : ExcelType[] | undefined}) => {
  // console.log(props.children)

  return (
    <div>
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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" stackId="1" fill="#8884df"/>
        <Bar dataKey="weight" stackId="1" fill="#82ca9d"/>
      </BarChart>
    </div>
  )
}

export default BarGraph