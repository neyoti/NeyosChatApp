import React, { createContext, useContext, useState } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [userfirstName, setUserFirstName] = useState('');
    const [userlastName, setUserLastName] = useState('');
    const [userbio, setUserBio] = useState('');

    return (
        <UserProfileContext.Provider value={{ userfirstName, userlastName, userbio, setUserFirstName, setUserLastName, setUserBio }}>
            {children}
        </UserProfileContext.Provider>
    );
};

export const useUserProfile = () => useContext(UserProfileContext);
