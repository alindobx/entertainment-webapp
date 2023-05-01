import {createContext, useContext, useEffect, useState} from "react";
import { signInWithGoogle } from "../components/firebase-congfig";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, signInWithPopup
} from 'firebase/auth'
import {auth} from "../components/firebase-congfig";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    },[])

    const logout =() => {
        return signOut(auth)
    }
    const google = () => {
        return signInWithGoogle.then((result)=> {
            const name = result.user.displayName;
            const email = result.user.email;
            const profilePic = result.user.photoURL;
        })
            .catch((error) => {
                console.log(error);
            })
    }

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    return (
        <UserContext.Provider value={{createUser, user, logout, signIn,google}}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
}