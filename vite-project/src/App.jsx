import { useState } from 'react'
import './App.css'
import React from 'react'
import LOGIN from './lf'
import Reg from './Reg'
import Hom from "./home"
import Into from "./intro"
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Into/>}/>
    <Route path="/lf" element={<LOGIN/>} />
    <Route path="/reg" element={<Reg/>} />
    <Route path="/todoapp" element={<Hom/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default App
