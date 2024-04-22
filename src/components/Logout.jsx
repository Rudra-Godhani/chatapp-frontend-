import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiPowerOff } from "react-icons/bi"
import "./css/Logout.scss"

function Logout() {
    const navigate = useNavigate();

    const handleClick = async () => {
        localStorage.clear();
        navigate("/login");
    }
    return (
        <button className='logout-btn'>
            <BiPowerOff onClick={handleClick}/>
        </button>
    )
}

export default Logout
