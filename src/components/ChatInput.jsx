import React, { useEffect, useRef, useState } from 'react'
import "./css/ChatInput.scss"
import Picker from "emoji-picker-react"
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

function ChatInput({ handleSendMessage }) {
    const [showEmojiPicker, setShowEmojiPcker] = useState(false);
    const [msg, setMsg] = useState("");
    const emojiRef = useRef();

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPcker(!showEmojiPicker);
    }

    const handleEmojiClick = (event, emoji) => {
        let message = msg;
        message += event.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMessage(msg);
            setMsg("");
        }
    }

    useEffect(() => {
        const hanler = (e) => {
            if (!emojiRef.current.contains(e.target)) {
                setShowEmojiPcker(false);
            }
        };

        document.addEventListener("mousedown", hanler);

        return () => {
            document.removeEventListener("mousedown", hanler);
        }
    }, []);

    return (
        <div className='chat-input' ref={emojiRef}>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <div className='pick'>
                            <Picker className='emoji-picker-react' onEmojiClick={handleEmojiClick} height="350px" width="18rem" />
                        </div>
                    }
                </div>
            </div>
            <form className='input-container' onSubmit={(e) => sendChat(e)}>
                <input type="text" placeholder='type your message here' value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button className="submit">
                    <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
