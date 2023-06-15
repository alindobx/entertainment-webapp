import React from "react";
import '../SignIn/SignIn.scss';
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import logo from "../../assets/images/logo.svg";

const SignUp = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { createUser } = UserAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try{
            await createUser(email, password);
            navigate('/Main')
        } catch (e) {
            setError(e.messsage);
            console.log(e.message);
        }
    };

    return (
        <>
            <header className="header-logo"><img src = {logo} alt="logo"/></header>
            <aside className="auth">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange = {(e) => setEmail(e.target.value)}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        onChange = {(e) => setPassword(e.target.value)}
                        type="text"
                        placeholder="Password"
                    />
                    <button className ="button-style">Create your Account</button>
                </form>
                <p>Already have an account?<span><Link to='/'>Sign In</Link></span></p>
            </aside>
        </>
    )
}

export default SignUp;

