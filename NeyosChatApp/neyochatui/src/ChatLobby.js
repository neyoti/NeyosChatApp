import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from "react";

import { Button, Row } from "react-bootstrap"

//import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useConnection } from "./components/ConnectionContext";
import { useMessage } from './components/MessageContext';

import { useRecipientProfile } from './components/RecipientProfileContext';
import { useUserProfile } from './components/UserProfileContext';
import { useUser } from './components/UsernameContext';
import Modal from 'react-bootstrap/Modal';

import { useEffect, useRef } from "react";
import ProfileImageDisplay from './components/ProfileImageDisplay';

const UserTab = ({ username, onTabClick }) => {
    return (
        <div
            style={{
                padding: "10px 10px",
                cursor: "pointer",
                width: "85%",
                height: "9vh",
                display: "flex",
                backgroundColor: "transparent",
                alignItems: "center",
                color: "black",
                fontSize: "26px"
            }}
            onClick={onTabClick}
        >
            {username}
        </div >
    );
};

const OnlineUserTab = ({ username, onTabClick }) => {
    return (
        <div
            style={{
                width: "10vh",
                height: "30px",
                //padding: "10px 80px",
                cursor: "pointer",
                border: "1px solid #000000",
                display: "inline-block",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                color: "black",
            }}
            onClick={onTabClick}
        >
            {username}
        </div >
    );
};

var chatLobbyFlag = false;
const ChatPortal = () => {
    console.log("Flag:", chatLobbyFlag);

    //const location = useLocation();
    //const { username } = location.state || {};

    const { connection, setConnection } = useConnection();
    const [connectionVariant, setConnectionVariant] = useState();
    const { messages, addMessage, setNewMessages } = useMessage();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { setFirstName, setLastName, setBio } = useRecipientProfile();
    const { setUserFirstName, setUserLastName, setUserBio } = useUserProfile();
    const { username, setUsername, setIsAuthenticated } = useUser();  // Get Username

    const [recipientArray, setRecipientArray] = useState([]);
    const [show, setShow] = useState(false);

    const joinChatLobby = async (user) => {
        try {
            chatLobbyFlag = true;
            const connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7085/chatportal", {
                    withCredentials: true,
                })
                .configureLogging(LogLevel.Information)
                .build();

            // connection.on("UsersInRoom", (users) => {
            //     setUsers(users);
            // })

            setConnectionVariant(connection);
            console.log("Connection:", connection);

            connection.on("OnlineUsers", (onlineUsers) => {
                setOnlineUsers(onlineUsers);
            })

            connection.on("ReceiveMessage", (user, message) => {
                console.log("Message received: ", message);

                // Update the messages array
                addMessage({ user, message });
            })

            connection.on("UpdateChatMessages", (msgs) => {
                console.log("In UpdateChatMessages");
                const parsedMessages = JSON.parse(msgs);
                console.log("Type of msgs: ", typeof parsedMessages);
                console.log("ChatMessages: ", parsedMessages);

                // Handle case where parsedMessages is an array of JSON strings
                const messagesArray = parsedMessages.map((msg) =>
                    typeof msg === "string" ? JSON.parse(msg) : msg
                );
                console.log("MSG Array:", messagesArray);
                setNewMessages(messagesArray);
            })

            connection.on("OldChatRecipientsList", (usersList) => {
                console.log("In OldChatRecipientsList");
                const parsedData = JSON.parse(usersList);
                console.log("usersArray: ", parsedData);

                setRecipientArray(parsedData);
            })

            connection.on("RecipientProfileData", (data) => {
                console.log("In RecipientProfileData");
                const parsedData = JSON.parse(data);
                console.log("Type of data: ", typeof parsedData);
                console.log("Recipient Data: ", parsedData);

                setFirstName(parsedData['FirstName']);
                setLastName(parsedData['LastName']);
                setBio(parsedData['Bio']);
            })

            connection.on("UserProfileData", (data) => {
                console.log("In UserProfileData");
                const parsedData = JSON.parse(data);
                console.log("Type of data: ", typeof parsedData);
                console.log("User Data: ", parsedData);

                setUserFirstName(parsedData['FirstName']);
                setUserLastName(parsedData['LastName']);
                setUserBio(parsedData['Bio']);
            })

            connection.on("ReceiveRefreshSignal", () => {
                setIsAuthenticated(true);
              });

            connection.onclose(e => {
                setConnection();
                // setMessages([]);
                setOnlineUsers([]);
            })

            await connection.start();
            await connection.invoke("JoinChatLobby", { user });
            setConnection(connection);
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (!chatLobbyFlag) {
            console.log("In useEffect");
            joinChatLobby(username);

            console.log("UserName:", username);
        }
    }, [username]);

    useEffect(() => {
        return async () => {
            if (connectionVariant) {
                console.log("ChatLobbyFlagBefore:", chatLobbyFlag);
                chatLobbyFlag = false;
                console.log("Chat lobby status updated before leaving the page.", chatLobbyFlag);
            }
        };
    }, []);

    // useEffect(() => {
    //     console.log("Messages updated:", messages);
    // }, [messages]);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);

    const yesButtonRef = useRef(null);

    useEffect(() => {
        if (show && yesButtonRef.current) {
            yesButtonRef.current.focus(); // Automatically focus "Yes" button when modal opens
        }
    }, [show]); // Runs whenever `show` changes

    const confirmLogOut = () => {
        setShow(true);
    }

    const logOutSession = async () => {
        try {
            //alert("Your logged in session will be closed!!!");

            if (!connectionVariant) {
                console.error("Connection is not established yet.");
                return;
            }
            else {
                console.log("It's Fineeeee");

                await connectionVariant.invoke("LogOutSession", username);
                setIsAuthenticated(false);
                chatLobbyFlag = false;
                setUsername('');
                navigate("/");
                //connectionVariant.stop();
            }
        } catch (e) {
            console.log(e);
        }
    }

    const handleTabClick = async (recipient) => {
        if (!connectionVariant) {
            console.error("Connection is not established yet.");
            return;
        }
        else {
            console.log("It's Fineeeee");
        }

        alert("Tab clicked!");
        console.log("Users:", onlineUsers);
        console.log("To:", recipient);
        console.log("Msgs:", messages);

        await connectionVariant.invoke("JoinChat", username, recipient);

        navigate('/chat', { state: { username, recipient } });
    };

    const [sidebarWidth] = useState('250px');

    if (!chatLobbyFlag)
        joinChatLobby(username);

    console.log("Connection:", connection);

    return (
        <div className="main-content" style={{ marginLeft: sidebarWidth }}>
            <div className='lobby'>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Attention</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you want to log out???
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button ref={yesButtonRef} variant="primary" onClick={() => logOutSession()}>Yes</Button>
                    </Modal.Footer>
                </Modal>


                <div className='profilebar'>
                    <div className='recipient-name-inlobby' >{username}</div>
                    <button className='logout-button' onClick={() => confirmLogOut()} >LogOut</button>
                </div>

                {/* <Form //className="lobby"
                    onSubmit={e => {
                        e.preventDefault();
                        joinChatLobby(username);
                    }} >
                    <Button variant="success" type="submit" className='connect-button' disabled={!username}>Connect</Button>
                </Form> */}

                <div className="user-list">
                    <h4>Online Users</h4><br></br>
                    {(onlineUsers.length === 1 && onlineUsers[0] === username) ? (
                        <p>No one</p>
                    ) : (
                        onlineUsers
                            .filter((u) => u !== username)
                            .map((u) => (
                                <div style={{ margin: "3px" }} key={u}>
                                    <OnlineUserTab username={u} onTabClick={() => handleTabClick(u)} />
                                    {/* <div className='recipient-name-inlobby' >{u}</div> */}
                                </div>
                            )
                            )
                    )}
                </div>

                <div className='chats-list'>
                    {recipientArray.map((user, index) => (
                        <Row>
                            <div className="custom-tab-container">
                                {/* <div className='recipient-profile-inlobby'></div> */}
                                < ProfileImageDisplay username={user} source={"chatlobby"}/>
                                <UserTab username={user} onTabClick={() => handleTabClick(user)} />
                            </div>
                        </Row>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ChatPortal;
