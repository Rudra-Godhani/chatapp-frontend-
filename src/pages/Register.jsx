import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./css/Register.scss"
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate("/");
        }
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (handleValidation()) {
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username, email, password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    }

    const handleValidation = () => {
        const { password, confirmPassword, username, email } = values;
        if (username.length < 3) {
            toast.error("Username should be greater than 3 characters", toastOptions);
            return false;
        } else if (email === "") {
            toast.error("email is required", toastOptions);
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters", toastOptions);
            return false;
        } else if (password !== confirmPassword) {
            toast.error("password and confirm password should be same.", toastOptions);
            return false;
        }
        return true;
    }

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    return (
        <>
            <div className='form-container'>
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="brand">
                        <img src={Logo} alt="" />
                        <h1>chantly</h1>
                    </div>
                    <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)} />
                    <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
                    <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={(e) => handleChange(e)} />
                    <button type='submit'>Create User</button>
                    <span>Already have an account ? <Link to="/login">Login</Link></span>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}

export default Register
