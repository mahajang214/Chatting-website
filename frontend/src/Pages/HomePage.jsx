import React, { useEffect, useState } from 'react'
import AllUsersSidebar from '../Components/AllUsersSidebar'
import axios from 'axios';
import Welcome from '../Components/Welcome';
import Home from '../Components/Home';
import userStore from '../Store/Store';
import Global from '../Components/Global';

function HomePage() {
  const {from,setFrom,fromName,setFromName,to,global} =userStore();

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/chat', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        });
        setData(res.data.user);
        setFrom(res.data.user._id);
        setFromName(res.data.user.name);
        // console.log("from:",from,"from Name:", fromName,"data:", res.data);
      } catch (error) {
        // console.log("Error in fetching user data", error);
      }

    }
    fetchUserData();
  }, []);

  return (
    <div className='w-full h-screen flex bg-[#222831] justify-between overflow-hidden items-center'>
      <div className='w-[25%]  h-screen flex justify-between rounded-r-lg overflow-hidden  items-center'>
        <AllUsersSidebar />
      </div>
      <div className='w-[75%] bg-[#222831] h-screen flex justify-between items-center'>
        {to?to === 'global' ? <Global/>:<Home/>:<Welcome username={`${data?data.name:null}`} />}
       
        
      </div>
    </div>
  )
}

export default HomePage