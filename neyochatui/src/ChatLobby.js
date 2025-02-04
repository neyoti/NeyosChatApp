import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { useState } from "react";

import { Button, Form } from "react-bootstrap"

//import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { useConnection } from "./components/ConnectionContext";
import { useMessage } from './components/MessageContext';

import { useRecipientProfile } from './components/RecipientProfileContext';
import { useUserProfile } from './components/UserProfileContext';
import { useUser } from './components/UsernameContext';

const UserTab = ({ username, onTabClick }) => {
    return (
        <div
            style={{
                padding: "10px 20px",
                cursor: "pointer",
                border: "1px solid #ccc",
                display: "inline-block",
                borderRadius: "4px",
                backgroundColor: "#f9f9f9",
                color: "black"
            }}
            onClick={onTabClick}
        >
            {username}
        </div>
    );
};

const ChatPortal = () => {

    //const location = useLocation();
    //const { username } = location.state || {};

    const { setConnection } = useConnection();
    const [connectionVariant, setConnectionVariant] = useState();
    const { messages, addMessage, setNewMessages } = useMessage();
    const [onlineUsers, setOnlineUsers] = useState([]);

    const { setFirstName, setLastName, setBio } = useRecipientProfile();
    const { setUserFirstName, setUserLastName, setUserBio } = useUserProfile();
    const { username, setUsername, setIsAuthenticated } = useUser();  // Get Username

    const joinChatLobby = async (user) => {
        try {

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

            connection.on("RecipientProfileData", (data) => {
                console.log("In RecipientProfileData");
                const parsedData = JSON.parse(data);
                console.log("Type of data: ", typeof parsedData);
                console.log("Recipient Data: ", parsedData);

                setFirstName(parsedData[0]['FirstName']);
                setLastName(parsedData[0]['LastName']);
                setBio(parsedData[0]['Bio']);
            })

            connection.on("UserProfileData", (data) => {
                console.log("In UserProfileData");
                const parsedData = JSON.parse(data);
                console.log("Type of data: ", typeof parsedData);
                console.log("User Data: ", parsedData);

                setUserFirstName(parsedData[0]['FirstName']);
                setUserLastName(parsedData[0]['LastName']);
                setUserBio(parsedData[0]['Bio']);
            })

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

    // useEffect(() => {
    //     console.log("Messages updated:", messages);
    // }, [messages]);

    const navigate = useNavigate();

    const logOutSession = async () => {
        try {
            alert("Your logged in session will be closed!!!");
            if (!connectionVariant) {
                console.error("Connection is not established yet.");
                return;
            }
            else {
                console.log("It's Fineeeee");
            }
            await connectionVariant.invoke("SetUserStatus", username, false);
            setIsAuthenticated(false);
            setUsername('');
            navigate("/");
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

    return (
        <div className="main-content" style={{ marginLeft: sidebarWidth }}>
            <div>
                <button onClick={() => logOutSession()} >LogOut</button>

                <Form //className="lobby"
                    onSubmit={e => {
                        e.preventDefault();
                        joinChatLobby(username);
                    }} >
                    <Button variant="success" type="submit" className='connect-button' disabled={!username}>Connect</Button>
                </Form>

                <div className="user-list">
                    <h1>Yooo<br></br>
                        .<br></br>
                        .<br></br>
                        .<br></br>
                        .<br></br>
                        .<br></br>
                        .<br></br>
                        .<br></br>
                    </h1>
                    <h4>Online Users</h4>
                    {onlineUsers.map((u) =>
                        <div style={{ margin: "20px" }} key={u}>
                            <UserTab username={u} onTabClick={() => handleTabClick(u)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatPortal;
