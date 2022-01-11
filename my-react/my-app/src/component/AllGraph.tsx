import * as React from 'react'
import { useEffect } from 'react'
import { Brush, Scatter, Bar, Legend, BarChart, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart} from 'recharts'
import XLSX from 'xlsx'
import AreaGraph from './AreaGraph'
import BarGraph from './BarGraph'
import ScatterGraph from './ScatterGraph'

export interface ExcelType {
  id: number
  weight: number
  sales: number
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

const ex: Array<ExcelType> = [
  {
    id: 1,
    sales: 200,
    weight: 30,
  },
  {
    id: 2,
    sales: 110,
    weight: 20,
  },
  {
    id: 3,
    sales: 400,
    weight: 30,
  },
  {
    id: 4,
    sales: 300,
    weight: 50,
  },
  {
    id: 5,
    sales: 200,
    weight: 20,
  },
  {
    id: 6,
    sales: 120,
    weight: 40,
  },
  {
    id: 7,
    sales: 430,
    weight: 30,
  }
]

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

function AllGraph() {
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

  const [resultFile, setResultFile] = useState<ExcelType[] | undefined>(undefined)
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
      
      <AreaGraph data={resultFile} />
      <div className='other_graph'>
        <BarGraph data={resultFile} />
        <ScatterGraph data={resultFile} />
      </div>
      
    </div>
  )
}

export default AllGraph