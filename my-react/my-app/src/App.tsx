import React from 'react';
import './App.css';
import AllGraph from './component/AllGraph';

interface ExcelType {
  id: number
  sales: number
  weight: number
}

function App() {
  return (
    <div>
      <AllGraph />
    </div>
  );
}

export default App;
