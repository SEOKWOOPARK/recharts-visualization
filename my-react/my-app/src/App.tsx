import React from 'react';
import './App.css';
import StackedGraph from './component/StackedGraph';

interface ExcelType {
  id: number
  sales: number
  weight: number
}

function App() {
  return (
    <div>
      {/* <input type="file" onChange={importExcel}/> */}
      <StackedGraph />
    </div>
  );
}

export default App;
