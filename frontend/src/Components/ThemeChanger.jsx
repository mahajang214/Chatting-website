import React from 'react';
import ThemeStore from '../Store/ThemeStore';

function ThemeChanger() {
    const { setThemeColor, theme, body, setChatBodyColor } = ThemeStore();

    const addColor = (e) => {
        if (theme) {
            setThemeColor(e);
            
        } 
        if (body) {
            setChatBodyColor(e);
        }
    }

    return (
        <div className='absolute z-1 top-[20%] right-[20%] flex w-[80%] flex-wrap px-4 py-3 rounded-2xl bg-[#ffffff21]'>
            <div className='w-1/2 h-12 bg-red-500 rounded-tl-2xl flex items-center justify-center text-white' onClick={() => addColor('#ff0000')}>#ff0000</div>
            <div className='w-1/2 h-12 bg-blue-500 rounded-tr-2xl flex items-center justify-center text-white' onClick={() => addColor('#3b82f6')}>#3b82f6</div>
            <div className='w-1/2 h-12 bg-green-500 flex items-center justify-center text-white' onClick={() => addColor('#10b981')}>#10b981</div>
            <div className='w-1/2 h-12 bg-yellow-500 flex items-center justify-center text-black' onClick={() => addColor('#facc15')}>#facc15</div>
            <div className='w-1/2 h-12 bg-purple-500 flex items-center justify-center text-white' onClick={() => addColor('#a855f7')}>#a855f7</div>
            <div className='w-1/2 h-12 bg-pink-500 flex items-center justify-center text-white' onClick={() => addColor('#ec4899')}>#ec4899</div>
            <div className='w-1/2 h-12 bg-orange-500 flex items-center justify-center text-black' onClick={() => addColor('#f97316')}>#f97316</div>
            <div className='w-1/2 h-12 bg-indigo-500 flex items-center justify-center text-white' onClick={() => addColor('#6366f1')}>#6366f1</div>
            <div className='w-1/2 h-12 bg-teal-500 flex items-center justify-center text-white' onClick={() => addColor('#14b8a6')}>#14b8a6</div>
            <div className='w-1/2 h-12 bg-gray-500 flex items-center justify-center text-white' onClick={() => addColor('#6b7280')}>#6b7280</div>
            <div className='w-1/2 h-12 bg-white rounded-bl-2xl flex items-center justify-center text-black' onClick={() => addColor('#ffffff')}>#ffffff</div>
            <div className='w-1/2 h-12 bg-[#222831] rounded-br-2xl flex items-center justify-center text-white' onClick={() => addColor('#222831')}>#222831</div>
            {/* <button   className='w-full py-2 bg-red-500 rounded-2xl mt-4'>Close</button> */}
        </div>
    )
}

export default ThemeChanger;