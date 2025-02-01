import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";

import { useLocation } from "react-router-dom";
import { useConnection } from "./ConnectionContext";
import { useNavigate } from 'react-router-dom';

import { useMessage } from './MessageContext';
import { useRecipientProfile } from './RecipientProfileContext';

const Chat = () => {

    const { messages } = useMessage();
    const { firstName, lastName, status } = useRecipientProfile();

    const location = useLocation();
    const { username, recipient } = location.state || {};
    const { connection } = useConnection();
    const navigate = useNavigate();
    
    const closeConnection = async () => {
        try {
            await connection.stop();
            navigate(-1);
        } catch (error) {
            console.error("Error closing connection:", error);
        }
    }

    const sendMessage = async (message) => {
        if (!message || !recipient) {
            console.error("Message or Recipient is not proper. Message", message, " Recipient:", recipient);
            return;
        }
        try {

            console.log("Recipient:", recipient);
            console.log("Message:", message);
            console.log("User:", username);
            console.log("Messages:", messages);

            await connection.invoke("SendMessage", message, recipient);

            await connection.invoke("SaveNewChatMessages", [{ user: username, message }], recipient);

        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    return <div className="chat-platform" >
        {
            !connection ? <h4>Connection Lost!!!</h4> :
                <div>
                    <div className="recipient-details">
                        <div className="recipient-profile">
                            <h4>  {firstName} {lastName}</h4>
                            <h3>{recipient}</h3>
                            <h3>{status ? "Online" : "Offline"}</h3>
                            <h3>Bio</h3>
                            <h4>Havya Havyashya Sandhi</h4>
                        </div>
                    </div>
                    <div className="chat">
                        <div className="profile-banner">
                            <h4>{recipient}</h4>
                            <button onClick={() => closeConnection()}>Leave Room</button>
                        </div>
                        <MessageContainer messages={messages} recipient={recipient} />
                        <SendMessageForm sendMessage={sendMessage} recipient={recipient} />
                    </div>
                </div>
        }
    </div>
}

export default Chat;