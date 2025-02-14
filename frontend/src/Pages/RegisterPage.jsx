import React from 'react'
import RegLog from '../Components/RegLog'
import Register from '../Components/Register'

function RegisterPage() {
    return (
        <div className='w-full h-screen flex justify-between items-center '>
            <div className='w-[40%] h-screen'>
                <RegLog />
            </div>
            <div className='w-[60%] h-screen'>
                <Register />
            </div>
        </div>
    )
}

export default RegisterPage