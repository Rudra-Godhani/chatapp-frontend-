import React from 'react'
import Robot from "../assets/robot.gif";
import "./css/Welcome.scss"

function Welcome({currentUser}) {
  return (
    <div className='welcome-container'>
        <img src={Robot} alt="Robot" />
        <h1>
            Welcome, <span>{currentUser?.username}!</span>
        </h1>
        <h3>Please select a chat to Start Messaging</h3>
    </div>
  )
}

export default Welcome
