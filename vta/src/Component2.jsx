import React from 'react'
import './Component2.css'
import img from './img.jpeg'
function Component2() {
  return (
    <>
    <div className='c2'>
      <div><img src={img} alt="img" className='img' /></div>
      <div className='nav'>
        <div className='home'>Home</div>
        <div className='home'>About</div>
        <div className='home'>Profile</div>
        <div className='home'>User's Guide</div>
        <div className='home'>Settings</div>
      </div>
    </div>
    
    </>
  )
}

export default Component2