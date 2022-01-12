import * as React from 'react'
import { ExcelType } from './AllGraph'
import XLSX from 'xlsx'
import BrushGraph from './BrushGraph'
import { Brush } from 'recharts'
import ComposedGraph from './ComposedGraph'

function AllGraph2() {
  const {useState} = React
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

  const validTestForExcelFile = (arr: Array<ExcelType> | undefined) => {
    if(arr) {
      return (
        <table>
          <thead>
            <tr>
              타입 오류 검증
            </tr>
          </thead>
          <tbody>
            {
            arr.map((it, index: number) => {
            const idx = index
              
            if(typeof(it.id) !== "number") {
              return (
                <>
                  <tr key={it.id}>
                    <th>id: </th>
                    <td>{`${it.id} / ${idx}번째`}</td>
                  </tr>
                </>
              )
            }
            
            if(typeof(it.sales) !== "number") {
              return (
                <>
                  <tr key={it.id}>
                    <th>sales: </th>
                    <td>{`${it.sales} / ${idx}번째` }</td>
                  </tr>
                </>
              )
            }
            if(typeof(it.weight) !== "number") {
              return (
                <>
                  <tr key={it.id}>
                    <th>weight: </th>
                    <td>{`${it.weight} / ${idx}번째`}</td>
                  </tr>
                </>
              )
            }
          })
          }
          </tbody> 
        </table>
      )
    } else {
      return null
    }
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
        <div>액셀을 추가하세요</div>
        <input type="file" onChange={importExcel} />
        <button type="submit">Visualizaing</button>
      </form>
      <BrushGraph data={resultFile} />
      <ComposedGraph data={resultFile} />
    </div>
  )
}

export default AllGraph2