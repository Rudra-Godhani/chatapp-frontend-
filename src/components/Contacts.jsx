import React, { useState, useEffect } from 'react'
import Logo from "../assets/logo.svg";
import "./css/Contacts.scss"

function Contacts({ contacts, currentUser, changeChat }) {
    const [currentUsername, setCurrentUsername] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUsername(currentUser.username);
        }
    }, [currentUser]);

    const changeCurrentChat = (index, conatct) => {
        setCurrentSelected(index);
        changeChat(conatct);
    }

    return (
        <>
            {
                currentUserImage && currentUsername && (
                    <div className='main-container'>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                            <h3>chantly</h3>
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div className={`contact ${index === currentSelected ? "selected" : ""}`} key={index} onClick={() => changeCurrentChat(index,contact)}>
                                            <div className="avatar">
                                                <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt="avatar" />
                            </div>
                            <div className="username">
                                <h2>{currentUsername}</h2>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Contacts
