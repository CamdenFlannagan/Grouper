import React, { createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const auth = getAuth();
    const [user, error] = useAuthState(auth);

    if (error) {
        return <div>Error: {error.message}</div>; // handle error state
    }

    return (
        <UserContext.Provider value={user ? user.uid : null}>
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(UserContext);
};
