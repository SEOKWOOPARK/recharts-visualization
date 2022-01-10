import * as React from 'react'
import { useEffect } from 'react'
import { Brush, Scatter, Bar, Legend, BarChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart} from 'recharts'
import XLSX from 'xlsx'

interface ExcelType {
  id: number
  sales: number
  weight: number
}

interface DummyData {
    name: string
    uv: number
    pv: number
    amt: number
}

interface ParamForXAxisZoom {
  from: number
  to: number
  ref: string
  offset: number
}

interface InitialState {
  data: Array<InitialData>
  left: string
  right: string
  refAreaLeft: string
  refAreaRight: string
  top: string
  bottom: string
  top2: string
  bottom2: string
  animation: boolean  
}

interface InitialData {
  name: number,
  cost: number,
  impression: number
}

const initialData: Array<InitialData> = [
  { name: 1, cost: 40, impression: 100 },
  { name: 2, cost: 50, impression: 120 },
  { name: 3, cost: 20, impression: 150 },
  { name: 4, cost: 130, impression: 180 },
  { name: 5, cost: 120, impression: 200 },
  { name: 6, cost: 300, impression: 499 },
  { name: 7, cost: 31, impression: 50 },
  { name: 8, cost: 40, impression: 100 },
  { name: 9, cost: 140, impression: 200 },
  { name: 10, cost: 200, impression: 222 },
  { name: 11, cost: 40, impression: 210 },
  { name: 12, cost: 250, impression: 300 },
  { name: 13, cost: 30, impression: 50 },
  { name: 14, cost: 80, impression: 190 },
  { name: 15, cost: 200, impression: 300 },
  { name: 16, cost: 290, impression: 400 },
  { name: 17, cost: 30, impression: 200 },
  { name: 18, cost: 28, impression: 50 },
  { name: 19, cost: 50, impression: 100 },
  { name: 20, cost: 70, impression: 100 }
]

const dataForStack: Array<DummyData> = [
    {
        name: '1',
        uv: 4000,
        pv: 2400,
        amt: 2400,
      },
      {
        name: '2',
        uv: 3000,
        pv: 1398,
        amt: 2210,
      },
      {
        name: '3',
        uv: 2000,
        pv: 9800,
        amt: 2290,
      },
      {
        name: '4',
        uv: 2780,
        pv: 3908,
        amt: 2000,
      },
      {
        name: '5',
        uv: 1890,
        pv: 4800,
        amt: 2181,
      },
      {
        name: '6',
        uv: 2390,
        pv: 3800,
        amt: 2500,
      },
      {
        name: '7',
        uv: 3490,
        pv: 4300,
        amt: 2100,
      },
      {
        name: '8',
        uv: 5000,
        pv: 2200,
        amt: 2000,
      },
      {
        name: '9',
        uv: 3000,
        pv: 1200,
        amt: 4000,
      },
]



function StackedGraph() {
  const {useState} = React
  // const {id, sales, weight} = props
  const [initialState, setInitialState] = useState<InitialState>({
    data: initialData,
    left: "dataMin",
    right: "dataMax",
    refAreaLeft: "",
    refAreaRight: "",
    top: "dataMax + 1",
    bottom: "dataMin - 1",
    top2: "dataMax + 20",
    bottom2: "dataMin - 20",
    animation: true
  })

  const FuncForXAxisZoom = (control: ParamForXAxisZoom) => {
    const refData : Array<any> = initialData.slice(control.from - 1, control.to)
    let [bottom, top] = [refData[0][control.ref], refData[0][control.ref]]
  
    refData.forEach((it) => {
      if(it[control.ref] > top) {
        top = it[control.ref]
      }
      if(it[control.ref] < bottom) {
        bottom = it[control.ref]
      }
    })
    console.log('줌 함수 작동!!!!!!')
    console.log((Number(bottom) | 0) - control.offset)
    console.log((Number(top) | 0) + control.offset)
    return [(Number(bottom) | 0) - control.offset, (Number(top) | 0) + control.offset]
    // return [(bottom | 0) - control.offset, (top | 0) + control.offset]
  }

  const Zoom = () => {
    // 줌인의 범위(가변적)
    let {refAreaLeft, refAreaRight} = initialState
    const {data} = initialState
    
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      setInitialState({...initialState, refAreaLeft: "", refAreaRight: ""})

      return
    }

    if(refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]
    
    const parameterForZoom1 = {from: Number(refAreaLeft), to: Number(refAreaRight), ref: "cost", offset: 1}
    const parameterForZoom2 = {from: Number(refAreaLeft), to: Number(refAreaRight), ref: "impression", offset: 50}
    const [bottom, top] = FuncForXAxisZoom(parameterForZoom1)
    const [bottom2, top2] = FuncForXAxisZoom(parameterForZoom2)
    
    setInitialState({
      ...initialState,
      refAreaLeft: "",
      refAreaRight: "",
      data: data,
      left: refAreaLeft,
      right: refAreaRight,
      bottom: bottom.toString(),
      top: top.toString(),
      bottom2: bottom2.toString(),
      top2: top2.toString(),
      animation: true
    })
    
  }

  const [resultFile, setResultFile] = useState<ExcelType[]>()
  const [excelFile, setExcelFile] = useState(null)
  const [excelFileError, setExcelFileError] = useState(null)
  const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
  const importExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target
    if (files) {
      const file = files[0]
      if(file){
        if(fileType.includes(file.type)) {
          let reader: FileReader = new FileReader()
          reader.readAsBinaryString(file)
          reader.onload = (event: any) => {
            setExcelFileError(null)
            setExcelFile(event.target.result)
          }
  
        } else {
          alert('errorrororor')
        }
      } else {
        alert('다시다시')
      }
    }
  }

  useEffect(() => {
    console.log(resultFile)
  }, [resultFile])
  
  const validTestForExcelFile = (arr: Array<ExcelType>) => {
    arr.forEach((it, index) => {
      if(typeof(it.id) !== "number"){
        console.log(`${index + 1}번째 행에서 id 값의 타입이 숫자가 아닙니다`)
      }
      if(typeof(it.sales) !== "number"){
        console.log(`${index + 1}번째 행에서 sale의 타입이 숫자가 아닙니다`)
      }
      if(typeof(it.weight) !== "number"){
        console.log(`${index + 1}번째 행에서 weight의 타입이 숫자가 아닙니다`)
      }
    })
  }

  const excelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if(excelFile !== null) {
      const workBook = XLSX.read(excelFile, {type: 'binary'})
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]
      const data: Array<ExcelType> = XLSX.utils.sheet_to_json(workSheet)
      validTestForExcelFile(data)
      setResultFile(data)
    } else {
      alert('')
    }
  }


  return (
    <div>
      <form className="form-group" onSubmit={excelSubmit}>
        <input type="file" onChange={importExcel}/>
        <button type="submit">제출하시오</button>
      </form>
      <h2>Stacked Graph For Analytics</h2>
      <ResponsiveContainer width="100%" aspect={3}>
        <AreaChart
          width={500}
          height={400}
          data={resultFile}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis name="id" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="sales" stackId="1" stroke="#8884df" fill="url(#colorCost)"/>
          <Area type="monotone" dataKey="weight" stackId="2" stroke="#82ca9d" fill="url(#colorImpression)"/>
          <Brush />
        </AreaChart>
         
      </ResponsiveContainer>
      <div className='other_graph'>
        <BarChart
          width={500}
          height={400}
          data={resultFile}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0
          }}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="id"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales" stackId="1" fill="#8884df"/>
          <Bar dataKey="weight" stackId="1" fill="#82ca9d"/>
        </BarChart>
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
          <Scatter yAxisId="left" name="판매실적 + 체중" data={resultFile} fill="#8884df" />
          <Scatter yAxisId="right" name="판매실적 + 체중" data={resultFile} fill="#82ca9d" />
        </ScatterChart>
      </div>
    </div>
  )
}

export default StackedGraph