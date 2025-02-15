import React from 'react'
import Loading from '../Components/Loading'
import RegLog from '../Components/RegLog'
import Login from '../Components/Login'


function LoginPage() {
  return (
   <div className=' flex justify-between items-center w-full h-screen overflow-hidden'>
    <div className='w-[40%] h-screen'>
        <RegLog/>
    </div>
    <div className='w-[60%] h-screen '>
        <Login/>
    </div>
   </div>
  )
}

export default LoginPage