import React, { useState, useEffect } from 'react'
import pic from '../assets/Default-profile.jpg'
import axios from 'axios'
import Loading from '../Components/Loading'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'
import userStore from '../Store/Store';
function AllUsersSidebar() {
    const [users, setUsers] = useState(null);
    const {to,setTo,toName,setToName}=userStore();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/chat/users', {
                    withCredentials: true
                });
                setUsers(res.data.users);
                console.log(res.data);

            } catch (err) {
                console.log(err);

            }
        }
        fetchUsers();
    }, [])
    // useGSAP(() => {
    //     gsap.from('#fetchedUser', {
    //         duration: .7,
    //         x: -600,
    //         stagger: .5

    //     })
    // }, [])
    

    return (
        <div className='w-full h-full bg-[#06dfb0]  overflow-y-scroll flex  items-center flex-col'>
            <h1 className='text-3xl font-bold mt-3 text-white'>All Users</h1>
            {users ? users.map((el, k) => {
                return (

                    <div onClick={(e)=>{
                        setTo(el._id);
                        setToName(el.name);
                    }} id='fetchedUser' key={k} className='w-full bg-[#ffffff59] flex px-3 py-2 rounded-xl gap-3 mt-3  items-center'>
                        <div className='w-[3.2vw] rounded-full border-3 border-[#ffffffdb] overflow-hidden'>
                            <img src={el.profilePic ? el.profilePic : pic} className='w-full h-full' alt="User profile pic" />
                        </div>
                        <h1 className='text-white text-xl'>{el.name}</h1>
                    </div>
                )
            }) : <Loading />}
        </div>
    )
}

export default AllUsersSidebar