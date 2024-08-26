import React, { createContext, useState } from 'react';

// Create the context
export const AddressContext = createContext();

// Create a provider component
export const AddressProvider = ({ children }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);

    return (
        <AddressContext.Provider value={{ selectedAddress, setSelectedAddress }}>
            {children}
        </AddressContext.Provider>
    );
};