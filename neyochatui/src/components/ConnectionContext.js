import { createContext, useContext, useState } from "react";

const ConnectionContext = createContext();

export const ConnectionProvider = ({ children }) => {
    const [connection, setConnection] = useState(null);

    return (
        <ConnectionContext.Provider value={{ connection, setConnection }}>
            {children}
        </ConnectionContext.Provider>
    );
};

export const useConnection = () => useContext(ConnectionContext);
