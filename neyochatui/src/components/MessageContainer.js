import { useEffect, useRef } from "react";
import { useConnection } from "./ConnectionContext";

const MessageContainer = ({ messages, recipient }) => {

    const messageRef = useRef();
    const { connection } = useConnection();
    
    //console.log("Recipient i MsgContainer:", recipient);
    //connection.invoke("GetChatMessages", messages, recipient);

    console.log("M:", messages);
    useEffect(()=>{
        
        if(messageRef && messageRef.current){
            const { scrollHeight, clientHeight } = messageRef.current;
            messageRef.current.scrollTo({
                left: 0, 
                top: scrollHeight - clientHeight, 
                behavior: "smooth"
            });
        }
    }, [messages]);

    return <div ref={messageRef} className="message-container">
        {messages.map((m, index) =>
            <div key={index} className={m.user == recipient ? "recipient-message" : "user-message"}>
                <div className={m.user == recipient ? "from-recipient" : "from-user"} >{m.user}</div>
                <div className={m.user == recipient ? "recipient-message-theme": "user-message-theme"} >{m.message}</div>
            </div>
        )}
    </div>
}

export default MessageContainer;