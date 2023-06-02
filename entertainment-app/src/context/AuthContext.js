import {createContext, useContext, useEffect, useState} from "react";
import { signInWithGoogle } from "../components/firebase-congfig";
import { ToastContainer, toast } from "react-toastify";
import React from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged, signInWithPopup
} from 'firebase/auth'
import {auth} from "../components/firebase-congfig";
import axios from "axios";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    const [ myData, setMyData ] = useState([]);
    const [ isBookMarked, setBookMarked ] = useState(true)
    //identify event that was clicked and data coming in parameters

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("setter",currentUser)
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
    //on HandleClick
    const onHandleClick = async (e,media) => {
        e.preventDefault()
        // below captures the current events id number
        const idResults = Number(e.currentTarget.id)
        //below filters through the data and matches "id" to "id" of event
        const updateObj = media.filter((obj) => {
            if (obj.id === idResults) {
                setBookMarked(prevState => !prevState)
                console.log("current",obj.isBookmarked, obj.title)
                obj.isBookmarked = isBookMarked
            }
            return obj
        })
        console.log(updateObj);
        await axios.patch(`https://moviedb-3.onrender.com/media/${idResults}`, {
            isBookmarked: isBookMarked
        }).then((res) => {
            alert('Data Posted Successfully!');
            console.log("what is being sent",isBookMarked);
        })
        console.log("bookmark", idResults )
    }

    const signIn = (email,password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    return (
        <UserContext.Provider value={{myData, createUser, user, logout, signIn,google,onHandleClick}}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
}