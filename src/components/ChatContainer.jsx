import React, { useEffect, useRef, useState } from 'react'
import "./css/ChatContainer.scss"
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios from "axios";
import { sendMessageRoute } from '../utils/APIRoutes'
import { getAllMessageRoute } from "../utils/APIRoutes"
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const scrollRef = useRef();

    const fecthCurrentChat = async () => {
        if (currentChat) {
            const response = await axios.post(getAllMessageRoute, {
                from: currentUser._id,
                to: currentChat._id,
            });
            console.log("response: ", response.data);

            setMessages(response.data);
        }
    }

    useEffect(() => {
        fecthCurrentChat();
    }, [currentChat]);

    const handleSendMessage = async (msg) => {
        const data = await axios.post(sendMessageRoute, {
            from: currentUser?._id,
            to: currentChat?._id,
            message: msg
        });
        socket.current.emit("send-msg", {
            to: currentChat._id,
            from: currentUser._id,
            message: msg
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, []);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
    }, [messages]);

    return (
        <>
            {
                currentChat && (
                    <div className='chat-container'>
                        <div className="chat-header">
                            <div className="user-details">
                                <div className="avatar">
                                    <img src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`} alt="avatar" />
                                </div>
                                <div className="username">
                                    <h3>{currentChat?.username}</h3>
                                </div>
                            </div>
                            <Logout />
                        </div>
                        <div className="chat-messages">
                            {
                                messages.map((message) => {
                                    return (
                                        <div ref={scrollRef} key={uuidv4}>
                                            <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                                                <div className="content">
                                                    <p>
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ChatInput handleSendMessage={handleSendMessage} />
                    </div>
                )
            }
        </>
    )
}

export default ChatContainer
