import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import './App.css'
import EmployeeDetails from './components/EmployeeDetails'
import EmployeeApp from './components/EmployeeApp'

function App() {


  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="employee"/>} />
        <Route path="/employee" element={<EmployeeApp/>} />
        <Route path="/employee/:id" element={<EmployeeDetails/>} />
        <Route />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
