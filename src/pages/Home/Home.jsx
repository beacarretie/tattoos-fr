import React from 'react'
import videoBg from '../../images/videotattoo.mp4'
import "./Home.css";

export const Home = () => {
  return (
    <div className='main'>
        <div className="overlay"></div>
        <video src={videoBg} autoPlay loop muted />
        <div className="content">
        <img src="../src/images/tattoo-logo-purple.svg"></img>
            <p>Madrid Art Tattoo</p>
        </div>
    </div>
  )
}