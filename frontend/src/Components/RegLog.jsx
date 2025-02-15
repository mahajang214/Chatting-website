import React from 'react'
import gsap from 'gsap';
import {useGSAP} from '@gsap/react' 


function RegLog() {
    useGSAP(()=>{
        gsap.from('#reglog',{
            x:-1000,
            duration:.9,
            ease:'expo.inOut'
        })
    },[])
    return (
        <div id='reglog' className='w-full h-full bg-[#06dfb0] rounded-r-lg text-white flex justify-center items-center'>
            <div className='w-full py-4 px-5 flex flex-col justify-center items-center'>
                <h1 className='text-[40px] '>Welcome to <span className='font-bold'>Chatting</span> <span className='underline'>website</span></h1>
                
            </div>
        </div>
    )
}

export default RegLog
