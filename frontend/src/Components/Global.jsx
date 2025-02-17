import React, { useEffect, useState } from 'react'
import userStore from '../Store/Store'
import Loading from './Loading';
import axios from 'axios';
import ThemeStore from '../Store/ThemeStore';
function Global() {
    const [globMsg, setGlobMsg] = useState(null)
    const [loading, setLoading] = useState(false)
    const { global, from, fromName,setVerified } = userStore();
    const [inputText, setInputText] = useState('');
    const [openSetting, setOpenSetting] = useState(false);
    const {themeColor}=ThemeStore();
    useEffect(() => {
        const getGlobalMessages = async () => {
            try {
                const globMsg = await axios.get('http://localhost:3001/api/getGlobalMessage', {
                    withCredentials: true
                })
                setGlobMsg(globMsg.data.globalMessages)
                // console.log(globMsg.data.globalMessages);

            } catch (error) {
                console.error("Error fetching global messages: ", error);
            }
        }
        getGlobalMessages();
    }, []);
    const logoutUser = async (e) => {
        e.preventDefault();
        try {
          const logout = await axios.get('http://localhost:3001/api/auth/logout', { withCredentials: true });
          console.log(logout.data.msg);
          localStorage.clear();
          setVerified(false);
          // window.location.reload();
          // navigate('/login');
    
        } catch (error) {
          console.log("Error in logout user", error);
    
        }
      }

    const sendMsgToGlob = async () => {
        try {
            setLoading(true);
            console.log("From: ", from, "From Name: ", fromName);
            const sendToGlobal = await axios.post('http://localhost:3001/api/send/global', { textData: inputText, from, fromName }, { withCredentials: true });
            console.log(sendToGlobal.data.globalList);
            setLoading(false);

        } catch (error) {
            console.error("Failed to send message to global chat", error);
            setLoading(false);
        }
    }
    return (
        <div className='w-full h-full relative flex flex-col '>
            <nav className='py-4 w-full h-[7vh]  px-3 border-b-2 flex text-white justify-between items-center'>
                <span className='text-xl'>Global Chat-Room</span>
                <button className='w-[30px] cursor-pointer' onClick={(e) => setOpenSetting(true)} >
                    <svg className='text-white ' enable-background="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><circle cx="16" cy="16" fill="none" id="XMLID_224_" r="4" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></circle><path d="  M27.758,10.366l-1-1.732c-0.552-0.957-1.775-1.284-2.732-0.732L23.5,8.206C21.5,9.36,19,7.917,19,5.608V5c0-1.105-0.895-2-2-2h-2  c-1.105,0-2,0.895-2,2v0.608c0,2.309-2.5,3.753-4.5,2.598L7.974,7.902C7.017,7.35,5.794,7.677,5.242,8.634l-1,1.732  c-0.552,0.957-0.225,2.18,0.732,2.732L5.5,13.402c2,1.155,2,4.041,0,5.196l-0.526,0.304c-0.957,0.552-1.284,1.775-0.732,2.732  l1,1.732c0.552,0.957,1.775,1.284,2.732,0.732L8.5,23.794c2-1.155,4.5,0.289,4.5,2.598V27c0,1.105,0.895,2,2,2h2  c1.105,0,2-0.895,2-2v-0.608c0-2.309,2.5-3.753,4.5-2.598l0.526,0.304c0.957,0.552,2.18,0.225,2.732-0.732l1-1.732  c0.552-0.957,0.225-2.18-0.732-2.732L26.5,18.598c-2-1.155-2-4.041,0-5.196l0.526-0.304C27.983,12.546,28.311,11.323,27.758,10.366z  " fill="none" id="XMLID_242_" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"></path></svg>
                </button>
            </nav>
            <main className='w-full h-[95%] px-2'>


                {global && globMsg && loading === false ? globMsg.map((el, k) => {
                    // console.log("fromName:", fromName, "from: ", from, "el.fromName:", el.fromName, "el.from:", el.from);

                    if (el.from === from) {
                        return (
                            //right div
                            <div id='messageCommingFromBackendFrom' className="w-full flex justify-end  items-end">
                                <div key={k}
                                    className={`  relative  px-2 py-4 rounded-tl-xl rounded-b-xl rounded-tr-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>

                                    <h3 className={`text-white text-right`} >{el.textData}</h3>
                                    <p className="absolute top-[0px] text-lg right-[10px]  " style={{color:`${themeColor}`}} >{el.fromName}</p>
                                    <p className={`absolute bottom-0 left-[1px]  text-[#ffffffb4] text-sm`}>{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                            </div>
                        )


                    }
                    return (



                        <div key={k} id='messageCommingFromBackendTo' className="w-full flex justify-start items-start">
                            <div className={` relative  px-2 py-4  rounded-tr-xl rounded-b-xl rounded-tl-0 mt-3   bg-[#f8f8f861] overflow-hidden `}>
                                <h3 className="text-white ">{el.textData}</h3>
                                <p className="absolute top-[0px]  text-md text-[#06dfb0]"  >{el.fromName}</p>
                                <p className="absolute bottom-0 right-[1px] text-[#ffffffb4] text-sm">{new Date(el.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </div>
                        </div>


                    )
                }) : <Loading />}
            </main>
            <div className='bg-[#ffffff17] py-1 px-3 rounded-lg flex justify-between items-center'>
        <input onChange={(e) => setInputText(e.target.value)} value={inputText} className='w-full outline-none px-1 text-white text-xl' type="text" placeholder='Hey there type something' />
        <input type="file" className='hidden' name="" id="selectFiles" />
        <button onClick={() => {
          const selectFiles = document.querySelector('#selectFiles');
          selectFiles.click();
        }} className='px-2  w-[60px] h-[40px] cursor-pointer mr-3 rounded-md text-xl '>
          <svg className='w-full h-full' fill='#06dfb0' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title></title><g id="Image"><path d="M25,2H7A5,5,0,0,0,2,7V25a5,5,0,0,0,5,5H25a5,5,0,0,0,5-5V7A5,5,0,0,0,25,2ZM7,4H25a3,3,0,0,1,3,3v5.59l-1.88-1.88a3,3,0,0,0-4.24,0l-7.95,8-3-2.42a3,3,0,0,0-3.8,0L4,18.86V7A3,3,0,0,1,7,4ZM25,28H7a3,3,0,0,1-3-3V21.47l4.38-3.66a1,1,0,0,1,1.27,0l3.73,3a1,1,0,0,0,1.33-.07l8.58-8.59a1,1,0,0,1,1.42,0L28,15.41V25A3,3,0,0,1,25,28Z"></path><path d="M10,13a3,3,0,1,0-3-3A3,3,0,0,0,10,13Zm0-4a1,1,0,1,1-1,1A1,1,0,0,1,10,9Z"></path></g></svg>
        </button>
        <button onClick={sendMsgToGlob} className='px-3 py-2 w-[50px] h-[40px] rounded-md text-xl bg-[#06dfb0]'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-full h-full' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-send"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
      {openSetting ? <div id='settingPage' className='absolute top-0 right-[0] w-1/5 h-screen bg-[#06dfb0]  rounded-l-lg flex flex-col items-center '>
        <h1 className='text-white font-bold text-3xl mt-2'>Setting</h1>
        <button className='w-full py-4 bg-[#ffffff59] mt-3 px-3 items-center rounded-lg gap-3 flex cursor-pointer'>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">
            <g id="user">
              <g>
                <path d="M256.167,277.721c-55.4,0-100.471-45.071-100.471-100.471S200.767,76.779,256.167,76.779
			c55.4,0,100.471,45.071,100.471,100.471S311.567,277.721,256.167,277.721z"></path>
              </g>
              <g>
                <path d="M437.19,74.98C388.83,26.63,324.55,0,256.17,0S123.5,26.63,75.15,74.98S0.17,187.62,0.17,256S26.8,388.67,75.15,437.02
			C123.5,485.37,187.79,512,256.17,512s132.66-26.63,181.021-74.98C485.54,388.67,512.17,324.38,512.17,256
			S485.54,123.33,437.19,74.98z M69.31,399.37C38.75,359.63,20.55,309.9,20.55,256c0-129.92,105.7-235.62,235.62-235.62
			S491.78,126.08,491.78,256c0,53.92-18.2,103.67-48.79,143.42c-7.58-25.359-26.88-48-56.183-65.311
			c-35.407-20.92-82.02-32.439-131.24-32.439c-49.16,0-95.57,11.521-130.68,32.46C95.91,351.41,76.82,374.01,69.31,399.37z"></path>
              </g>
            </g>
          </svg>
          <h2 className='text-2xl'>Profile</h2>
        </button>
        <button className='w-full py-4 bg-[#ffffff59] mt-3 px-3 items-center rounded-lg gap-3 flex cursor-pointer'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-[32px] h-[32px]' viewBox="0 0 64 64"><title>2</title><g id="Layer_90" data-name="Layer 90"><path d="M61.41,31.24,32.76,2.59a2,2,0,0,0-2.83,0L13.27,19.25A6.25,6.25,0,0,0,9.06,29.91l5.78,5.78a2.25,2.25,0,0,1,0,3.19L4.13,49.59A7.27,7.27,0,1,0,14.41,59.87L25.12,49.16a2.31,2.31,0,0,1,3.19,0l5.78,5.78a6.25,6.25,0,0,0,8.84,0h0a6.23,6.23,0,0,0,1.82-4.21L61.41,34.06A2,2,0,0,0,61.41,31.24ZM40.11,52.11a2.26,2.26,0,0,1-3.19,0l-5.78-5.78a6.25,6.25,0,0,0-8.85,0L11.58,57A3.35,3.35,0,0,1,7,57a3.27,3.27,0,0,1,0-4.62L17.67,41.71a6.25,6.25,0,0,0,0-8.85l-5.78-5.78a2.25,2.25,0,0,1,3.16-3.21L40.13,48.95A2.26,2.26,0,0,1,40.11,52.11Zm3.22-5.62L43,46.14l0-.05-25-25-.05,0-.35-.35L31.35,6.83l2.83,2.83-6,8.64,8.64-6,4.86,4.86-3.1,5.57,5.57-3.1,7.55,7.55-6,8.64,8.64-6,2.89,2.89Z"></path></g></svg>
          <h2 className='text-2xl'>Theme</h2>
        </button>
        <button onClick={logoutUser} className='w-full py-4 bg-[#ffffff59] mt-3 px-3 cursor-pointer items-center rounded-lg gap-3 flex'>
          <svg xmlns="http://www.w3.org/2000/svg" className='w-[32px]' viewBox="0 0 512 512"><title>Logout</title><g id="Logout"><g id="Logout-2" data-name="Logout"><path d="M256,73.8247a182.18,182.18,0,0,0-182.18,182.18c0,100.6173,81.567,182.1708,182.18,182.1708a182.1753,182.1753,0,1,0,0-364.3506Zm-18.0963,86.2209a18.0986,18.0986,0,0,1,36.1971,0V214.02a18.0986,18.0986,0,0,1-36.1971,0ZM256,348.5884a92.4129,92.4129,0,0,1-32.9634-178.7517v33.381a62.4533,62.4533,0,1,0,65.9313,0v-33.381A92.4149,92.4149,0,0,1,256,348.5884Z"></path></g></g></svg>
          <h2 className='text-2xl'>Logout</h2>
        </button>
        <button className='w-full py-2 bg-[#e94b4b] mt-3 px-3 text-2xl rounded-lg cursor-pointer' onClick={() => setOpenSetting(false)} > Close</button>
      </div> : null}
        </div>
    )
}

export default Global