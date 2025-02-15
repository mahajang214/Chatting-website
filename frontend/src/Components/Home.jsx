import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loading from './Loading';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import userStore from '../Store/Store';

function Home() {
  const [data, setData] = useState(null);
  const { to, toName, fromName } = userStore();
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  // console.log("fromName",fromName,"to Name: ",toName);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/chat/get/${to}`, { withCredentials: true });
        setData(res.data.messages);
        console.log(data);
      } catch (error) {
        console.error("error in fetching messages", error);

      }

    }
    fetchMessages();
  }, [to])
  // useGSAP(() => {
  //   gsap.from('#home', {
  //     duration: 1,
  //     opacity: 0,

  //   });
  //   gsap.to('#home', {
  //     duration: 1,
  //     opacity: 1,
  //   })
  //   gsap.from('#messageCommingFromBackendFrom', {
  //     duration: .5,
  //     x: 300,
  //     stagger: .2
  //   })
  //   gsap.from('#messageCommingFromBackendTo', {
  //     duration: .5,
  //     x: -300,
  //     stagger: .2
  //   })
  // }, [to])

  const sendData = async (e) => {
    e.preventDefault();
    if(inputText===''){
      alert("Please enter a message");
      return;
    }
    try {
      setLoading(true);
      const send = await axios.post(`http://localhost:3001/api/chat/send/${to}`, { text: inputText }, { withCredentials: true });
      console.log(send.data);
      setLoading(false);
      setInputText('');
    } catch (error) {
      console.log(error);

    }
  }
  return (
    <div id='home' className='w-full h-full  text-white'>
      <nav className='py-4 px-3 border-b-2 flex justify-between items-center'>
        <span className='text-xl'>{toName}</span>
        <button>Setting</button>
      </nav>
      <main className='w-full h-[88.4%]'>
        {data && data.length > 0 ?
          data.map((el, k) => {
            // console.log("el", el);
            // console.log(Boolean(to===el.from));  //to ===el.from
            if (to === el.from) {
              return (
                <div id='messageCommingFromBackendTo' className="w-full flex justify-start items-start">
                  <div className={` relative  px-2 py-4  rounded-tr-xl rounded-b-xl rounded-tl-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>
                    <h3 className="text-white ">{el.text}</h3>
                    <p className="absolute top-[0px]  text-md text-[#00ffe1f0]">{toName}</p>
                    <p className="absolute bottom-0 right-[1px] text-[#ffffffb4] text-sm">{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )

            }
            else {


              return (
                //to wali div'
                <div id='messageCommingFromBackendFrom' className="w-full flex justify-end  items-end">
                  <div key={k}
                    className={`  relative  px-2 py-4 rounded-tl-xl rounded-b-xl rounded-tr-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>

                    <h3 className={`text-white text-right`} >{el.text}</h3>
                    <p className="absolute top-[0px] text-lg right-[10px]  text-[#00ffe1f0]">{fromName}</p>
                    <p className={`absolute bottom-0 left-[1px]  text-[#ffffffb4] text-sm`}>{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
              )
            }
          }) : <Loading />
        }
        {loading&&<Loading/>}
        {/* data.length<?<h1 className='text-2xl'>You haven't missed anything yet! No messages to show.</h1>: */}
      </main>
      <div className='bg-[#ffffff17] py-1 px-3 rounded-lg flex justify-between items-center'>
        <input onChange={(e) => setInputText(e.target.value)} value={inputText} className='w-full outline-none px-1 text-xl' type="text" placeholder='Hey there type something' />
        <button onClick={sendData} className='px-3 py-2 w-[50px] h-[40px] rounded-md text-xl bg-[#06dfb0]'>
           <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  )
}

export default Home