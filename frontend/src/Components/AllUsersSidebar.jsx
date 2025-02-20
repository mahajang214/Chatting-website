import React, { useState, useEffect } from 'react';
import ThemeStore from '../Store/ThemeStore';
import axios from 'axios';
import userStore from '../Store/Store';
import Loading from './Loading';
import pic from '../assets/Default-profile.jpg'


function AllUsersSidebar() {
    const { setThemeColor, theme, body, setChatBodyColor,themeColor} = ThemeStore();

    const [users, setUsers] = useState(null);
    const { setToName, setGlobal, global,setTo,to } = userStore();
    const [prompt, setPrompt] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/chat/users', { withCredentials: true })
                setUsers(res.data.users);
                // console.log(res.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }

        }
        fetchUsers();
    }, []);

    return (
    <div className={`w-full h-full relative`} style={{ backgroundColor: themeColor }}>

  
    <h1 className='text-3xl font-bold mt-5 text-center text-white'>All Users</h1>
            {
        users ? users.map((el, k) => {
            return (
                <div onClick={(e) => {
                    setTo(el._id);
                    setToName(el.name);
                    if (global && to) {
                        setGlobal(false);
                    }
                }} id='fetchedUser' key={k} className='w-full bg-[#ffffff59] flex px-3 py-2 gap-3 mt-3 items-center'>
                    <div className='w-[3.2vw] rounded-full border-3 border-[#ffffffdb] overflow-hidden'>
                        <img src={pic} className='w-full h-full' alt="User profile pic" />
                    </div>
                    <h1 className='text-white text-xl'>{el.name}</h1>
                </div>
            )
        }) : <Loading />
    }
            <button onClick={() => { setGlobal(true); setTo('global'); }} className='w-full bg-pink-500 cursor-pointer absolute bottom-2 rounded-md text-2xl py-1 text-white'>Global chat</button>
            {/* <div className='w-full py-2 bg-amber-300 px-3 items-center hidden'>
                <input onChange={(e) => (setPrompt(e.target.value))} className='outline-none' type="text" placeholder='Generate image with AI' />
                <button className='w-[40px] h-[40px] rounded-md bg-[#fff]'>
                    <svg version="1.1" className='' id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" fill='#000' xml:space="preserve">
                        <path class="st0" d="M22,6.4c0-0.2-0.1-0.4-0.2-0.5l-2.4-2.4c-0.1-0.1-0.3-0.2-0.5-0.2c-0.2,0-0.4,0.1-0.5,0.2L2.9,18.9
                            c-0.1,0.1-0.2,0.3-0.2,0.5c0,0.2,0.1,0.4,0.2,0.5l2.4,2.4c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2L21.7,6.9
                            C21.9,6.8,22,6.6,22,6.4z M16.6,9.9l-1.3-1.3l3.5-3.5l1.3,1.3L16.6,9.9z M5.4,6l0.4-1.2L7,4.5L5.8,4.1L5.4,2.9L5.1,4.1L3.9,4.5
                            l1.2,0.4L5.4,6z M8.5,7.5l0.7,2.3L10,7.5l2.3-0.7L10,6L9.3,3.7L8.5,6L6.2,6.8L8.5,7.5z M21.1,11.8l-0.4-1.2l-0.4,1.2l-1.2,0.4
                            l1.2,0.4l0.4,1.2l0.4-1.2l1.2-0.4L21.1,11.8z M13.1,6l0.4-1.2l1.2-0.4l-1.2-0.4l-0.4-1.2l-0.4,1.2l-1.2,0.4l1.2,0.4L13.1,6z"></path>
                    </svg>
                </button>
            </div> */}
        </div >

    )
}

export default AllUsersSidebar;