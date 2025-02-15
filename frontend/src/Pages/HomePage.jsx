import React, { useEffect, useState } from 'react'
import AllUsersSidebar from '../Components/AllUsersSidebar'
import axios from 'axios';
import Welcome from '../Components/Welcome';
import Loading from '../Components/Loading';

function HomePage() {

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
        console.log(data);
      } catch (error) {
        console.log("Error in fetching user data", error);


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
        <Welcome username={`${data?data.name:null}`} />
      </div>
    </div>
  )
}

export default HomePage