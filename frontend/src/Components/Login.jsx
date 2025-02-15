import { useGSAP } from '@gsap/react';
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorMsg from './ErrorMsg';
import axios from 'axios';
import gsap from 'gsap';
import Loading from './Loading';
import userStore from '../Store/Store';

function Login() {
  const navigate = useNavigate();
  const {setVerified}=userStore();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:3001/api/auth/login', data, {
        withCredentials: true
      });
      setLoading(false);
      console.log(res.data.msg);
      setVerified(true);
      setData({ email: "", password: "" });
      <ErrorMsg msg={`Login successfull`} />
      navigate('/');
    } catch (error) {
      console.log(error);
      <ErrorMsg msg={`something went wrong `} />

    }

  }
  useGSAP(() => {
    gsap.from('#login', {
      x: 1000,
      duration: .9,
      ease: 'expo.inOut'
    })
  }, [])

  return (
    <div id='login' className='w-full h-full flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='border-[1px] py-5 px-3 w-1/2 rounded-md ' >

        <label className="input input-bordered flex items-center gap-2 mt-4 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input onChange={handleChange} name='email' value={data.email} type="text" className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2 mt-4 text-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-6 w-6 opacity-70  ">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input onChange={handleChange} name='password' value={data.password} type="password" className="grow" placeholder="******" />
        </label>
        {loading ? <Loading /> : <button className="w-full mt-4 bg-[#06dfb0] text-white font-bold py-1.5 text-2xl rounded-full">Login</button>}
      </form>
    </div>
  )
}

export default Login