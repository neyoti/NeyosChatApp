import React, { createContext, useContext, useState } from 'react';

const RecipientProfileContext = createContext();

export const RecipientProfileProvider = ({ children }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');

    return (
        <RecipientProfileContext.Provider value={{ firstName, lastName, bio, setFirstName, setLastName, setBio }}>
            {children}
        </RecipientProfileContext.Provider>
    );
};

export const useRecipientProfile = () => useContext(RecipientProfileContext);
