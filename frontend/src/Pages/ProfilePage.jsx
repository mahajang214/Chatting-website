import React, { useState, useEffect } from 'react'
import ThemeStore from '../Store/ThemeStore'
import axios from 'axios';
import pic from '../assets/Default-profile.jpg'
import Loading from '../Components/Loading';
import {useNavigate}from 'react-router-dom'
function ProfilePage() {
    const [fetchUserData, setFetchUserData] = useState(null);
    const { themeColor } = ThemeStore();
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate=useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/chat', { withCredentials: true });
                setFetchUserData(res.data.user);
                // console.log(res.data);

            } catch (error) {
                console.log(error);

            }
        }
        fetchUserData();
    }, [])
    return (
        <div className='w-full h-screen flex justify-center text-2xl items-center' style={{ backgroundColor: `${themeColor}` }} >
            <div className='bg-[#ffffff68] w-[50%] py-3 px-3 rounded-2xl'>
                <div className='w-full py-3 flex justify-center items-center relative'>
                    <input type="file" onChange={async (e) => {
                        const file = e.target.files[0];
                        if (file) {
                            const blob = new Blob([file], { type: file.type });
                            const url = URL.createObjectURL(blob);
                            setImageUrl(url);
                            // Create a URL for the file
                            // Set the image URL in the state
                            const formData = new FormData();
                            formData.append("file", blob, file.name);
                            // console.log("url:",url);
                            // console.log("formdata: ",formData);
                            setLoading(true);
                            try {
                                const sendImageToServer = await axios.post('http://localhost:3001/api/auth/setProfile', formData
                                , {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',  // The type of data you're sending
                                    },
                                    withCredentials: true
                                });
                                // console.log(sendImageToServer.data);
                                setLoading(false);
                            } catch (error) {
                                console.log(error);
                                setLoading(false);

                            }

                        }

                    }} className='hidden' name="" id="selectImage" />
                    <img src={`${imageUrl ? imageUrl : pic}`} alt="Profile picture" className='rounded-full' width={'300px'} height={'300px'} />
                    {loading ? <Loading /> : <button onClick={() => {
                        document.getElementById('selectImage').click();
                    }} className='absolute px-3 bottom-1 right-[37%] cursor-pointer text-6xl bg-green-400 rounded-full'>+</button>}
                </div>
                <div><h1>Username : {fetchUserData ? fetchUserData.name : null}</h1></div>
                <div><h1>Email : {fetchUserData ? fetchUserData.email : null} </h1></div>
                    <button onClick={()=>navigate('/')} className='w-full cursor-pointer py-2 text-2xl bg-green-400 rounded-2xl mt-4'>Save</button>
            </div>
        </div>
    )
}

export default ProfilePage