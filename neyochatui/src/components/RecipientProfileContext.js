import React, { createContext, useContext, useState } from 'react';

const RecipientProfileContext = createContext();

export const RecipientProfileProvider = ({ children }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [status, setStatus] = useState('');

    return (
        <RecipientProfileContext.Provider value={{ firstName, lastName, status, setFirstName, setLastName, setStatus }}>
            {children}
        </RecipientProfileContext.Provider>
    );
};

export const useRecipientProfile = () => useContext(RecipientProfileContext);
