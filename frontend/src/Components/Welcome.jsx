import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React from 'react'

function Welcome({username}) {
    useGSAP(()=>{
        gsap.from('#textWelcome', {
            duration: .7,
            opacity: 0.3,
            y: -100,
            stagger:1
        })
    })
  return (
    <div className='w-full h-full flex justify-center items-center text-white'><h1 id='textWelcome' className='text-4xl'>Welcome to our chatting website, {username}!</h1></div>
  )
}

export default Welcome