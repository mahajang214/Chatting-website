import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
