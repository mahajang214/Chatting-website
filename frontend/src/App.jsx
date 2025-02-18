import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import HomePage from './Pages/HomePage'
import userStore from './Store/Store'
import ErrorPage from './Pages/ErrorPage'
import ProfilePage from './Pages/ProfilePage'

function App() {
  const {verified}=userStore();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={verified?<HomePage />:<ErrorPage/>} />
          <Route path='/profile' element={verified?<ProfilePage/>:<ErrorPage/>} />
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='*' element={<ErrorPage/>}/>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
