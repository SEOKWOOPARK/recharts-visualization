import * as React from 'react'
import {RadialBarChart, RadialBar, Legend, Tooltip} from 'recharts'

interface DummyData {
  name: string,
  uv: number,
  pv: number,
  fill: string
}

const dataForRidial: Array<DummyData> = [
  {
      "name": "18-24",
      "uv": 31.47,
      "pv": 2400,
      "fill": "#8884d8"
  },
  {
    "name": "25-29",
    "uv": 26.69,
    "pv": 4567,
    "fill": "#83a6ed"
  },
  {
    "name": "30-34",
    "uv": -15.69,
    "pv": 1398,
    "fill": "#8dd1e1"
  },
  {
    "name": "35-39",
    "uv": 8.22,
    "pv": 9800,
    "fill": "#82ca9d"
  },
  {
    "name": "40-49",
    "uv": -8.63,
    "pv": 3908,
    "fill": "#a4de6c"
  },
  {
    "name": "50+",
    "uv": -2.63,
    "pv": 4800,
    "fill": "#d0ed57"
  },
  {
    "name": "unknow",
    "uv": 6.67,
    "pv": 4800,
    "fill": "#ffc658"
  }
]

function RidialGraph() {
  return (
    <div>
        <h2>RidalGraph For Analytics</h2>
        <RadialBarChart
          width={100}
          height={300}
          innerRadius="10%"
          outerRadius="80%"
          data={dataForRidial}
          startAngle={180}
          endAngle={0}
        >
          <RadialBar label={{ fill: '#666', position: 'insideStart' }}  dataKey='uv' />
          <Legend iconSize={10} width={120} height={140} layout='vertical' verticalAlign='middle' align="right" />
          <Tooltip />
        </RadialBarChart>
    </div>
  )
}

export default RidialGraph