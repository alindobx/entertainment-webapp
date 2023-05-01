import React from 'react';
import './SignIn.scss';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../../context/AuthContext';
import logo from "../../assets/images/logo.svg";



export default function SignIn() {
    const [email, setEmail] =useState('');
    const [password, setPassword] =useState('');
    const [error, setError] =useState('');
    const [ inputError,setInputError ] = useState('test');
    const [ placeHolder,setPlaceHolder] = useState('Email Address');
    const [ placeHolderPassword,setPlaceHolderPassword] = useState('Password')
    const {signIn} = UserAuth();
    const {google} = UserAuth();
    const navigate = useNavigate();

    const noValue = email === "";

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email,password);
            navigate('/account')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
        if(noValue) {
            setInputError("input-error");
            setPlaceHolder("Can't be empty");
            setPlaceHolderPassword("Can't be empty")
        }
    }

    const handleOnFocusHandle = () => {
       console.log("touchdown");
       setInputError('');
       setPlaceHolder("Email Address");
       setPlaceHolderPassword("Password")
    }

    const googleSignIn = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await google();
            navigate('/Main')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }

    return (
        <>
            <main className ="sign-card">
                <header><img src = {logo} alt="logo"/></header>
                <aside className="auth">
                    <h1>Sign In</h1>
                    <form onSubmit={handleSignIn}>
                        <input
                            onChange ={(e) => setEmail(e.target.value)}
                            type="text"
                            onFocus={handleOnFocusHandle}
                            placeholder={placeHolder}
                            className={inputError}
                        />
                        <input
                            onChange ={(e) => setPassword(e.target.value)}
                            type="text"
                            placeholder={placeHolderPassword}
                            className={inputError}
                        />
                        <button className ="button-style">Login to your account</button>

                        <div className="google-btn" onClick={googleSignIn}>
                            <div className="google-icon-wrapper">
                                <img className="google-icon"
                                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="btn"/>
                            </div>
                            <p className="btn-text"><b>Sign in with google</b></p>
                        </div>
                    </form>
                    <p>Don't have an account? <span><Link to='/sign-up'>Sign Up</Link></span></p>
                </aside>
            </main>
        </>
    );
}

