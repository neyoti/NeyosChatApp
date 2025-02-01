import React, { createContext, useContext, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    // Handler to add a single message
    const addMessage = (newMessage) => {
        setMessages((prev) => [...prev, newMessage]);
    };

    // Handler to replace the entire messages array
    const setNewMessages = (newMessages) => {
        setMessages(newMessages);
    };

    return (
        <MessageContext.Provider value={{ messages, addMessage, setNewMessages }}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => useContext(MessageContext);
