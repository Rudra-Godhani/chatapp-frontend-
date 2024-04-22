import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./css/Register.scss"
import axios from "axios";
import { loginRoute } from '../utils/APIRoutes';
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: "",
    password: "",
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
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, {
        username, password
      });
      console.log(data);

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
    const { password, username } = values;
    if (username.length === "") {
      toast.error("username and password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("username and password is required", toastOptions);
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
          <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)} min="3" />
          <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)} />
          <button type='submit'>Login In</button>
          <span>Don't have an account ? <Link to="/register">Register</Link></span>
        </form>
      </div>
      <ToastContainer />
    </>
  )
}

export default Login
