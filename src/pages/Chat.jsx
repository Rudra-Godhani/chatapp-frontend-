import React, { useState, useEffect, useRef } from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Chat.scss"
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { io } from "socket.io-client"
import { RiAccountCircleFill } from "react-icons/ri";
import { BsChatLeftTextFill } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";

function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const fetchUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
    }

  }

  const fetchData = async () => {

    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log("contact: ", data);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }

  const handleChatChange = (chat) => {
    console.log("chat: ", chat);
    setCurrentChat(chat);
    console.log("currentChat: ", currentChat);

  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchData();
  }, [currentUser])

  return (
    <div className="topContainer">
      <div className="chat">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
          (isLoaded && currentChat === undefined && currentUser !== undefined) &&
          < Welcome currentUser={currentUser} />
        }
        {
          (isLoaded && currentChat !== undefined && currentUser !== undefined) &&
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        }
      </div>
    </div >
  )
}

export default Chat
