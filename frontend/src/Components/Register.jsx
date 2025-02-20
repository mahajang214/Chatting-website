import axios from 'axios';
import React, { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import ErrorMsg from './ErrorMsg';
import Loading from './Loading';

function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (data.name.length < 3) {
            alert('Name must be at least 3 characters long.');
            return;
        }
        if (data.password.length < 8) {
            alert('Password must be at least 8 characters long.');
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post('http://localhost:3001/api/auth/register', data, {
                withCredentials: true
            });
            setLoading(false);
            // console.log(res.data.msg);
            setData({ name: "", email: "", password: "" });
            <ErrorMsg msg={`Registration successfull`} />
            navigate('/login');
        } catch (error) {
            console.log(error);
            <ErrorMsg msg={`something went wrong `} />

        }

    }
    useGSAP(() => {
        gsap.from('#register', {
            x: 1000,
            duration: .9,
            ease: 'expo.inOut'
        })
    }, [])

    return (
        <div id='register' className='w-full h-full flex justify-center items-center '>
            <form onSubmit={handleSubmit} className='border-[1px] py-5 px-3 w-1/2 rounded-md ' >

                <label className="input input-bordered flex items-center gap-2 mt-4 text-2xl">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-6 w-6 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input onChange={handleChange} name='name' value={data.name} type="text" className="grow" placeholder="Username" />
                </label>

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
               {loading===true?<Loading/>: <button className="w-full mt-4 bg-[#06dfb0] text-white font-bold py-1.5 text-2xl rounded-full">Register </button>}
            </form>
        </div>
    )
}

export default Register




