import * as React from 'react'
import { ExcelType } from './AllGraph'
import {
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from 'recharts'

const ScatterGraph: React.FC<{data: ExcelType[] | undefined}> = (props) => {
  return (
    <div>
      <ScatterChart
          width={500}
          height={400}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid />
          <XAxis type="number" dataKey="id" unit="번 사원"/>
          <YAxis yAxisId="left" type="number" dataKey="sales" stroke="#8884d8"/>
          <YAxis yAxisId="right" orientation="right" type="number" dataKey="weight" stroke="#82ca9d" />
          <Tooltip cursor={{strokeDasharray: "3 3"}}/>
          <Scatter yAxisId="left" name="판매실적 + 체중" data={props.data} fill="#8884df" />
          <Scatter yAxisId="right" name="판매실적 + 체중" data={props.data} fill="#82ca9d" />
        </ScatterChart>
    </div>
  )
}

export default ScatterGraph