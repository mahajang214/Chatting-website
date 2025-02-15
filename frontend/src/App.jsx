import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
