import React, {useContext} from 'react';
import "./assets/index.scss";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {NavLink, Route, Routes, useLocation} from "react-router-dom";
import {AuthContextProvider, UserAuth} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import  Movies  from "./components/Movies/Movies"
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Main/Main"
import Television from "./components/Television/Television";
import Bookmark from "./components/Bookmark/Bookmark";
import Search from './components/Search/Search';
import searchIcon from "./assets/images/icon-search.svg";
import {useState} from 'react';
import { SearchInputProvider } from './context/SearchInput';
import SearchInput from "./context/SearchInput";
import SearchForm from "./components/Search/SearchForm";

function App() {
    const [search, setSearch] = useContext(SearchInput)
    const location = useLocation();

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("search term",search)
    }

  return (
    <>
    <SearchInputProvider>
        <AuthContextProvider>
            <div className="container" style = {
                location.pathname === "/"
                || location.pathname === "/sign-up"
                    ?  { maxWidth:"400px"}
                    : {width: "90vw"}
            }>
                { location.pathname === "/"
                || location.pathname === "/sign-up"
                    ? <nav style={{display:"none"}}>
                        <Navigation />
                      </nav>:
                    <nav style={{maxWidth:"2.63rem"}}>
                        <Navigation props ={location} />
                    </nav>
                }

                <main>
                    <header className="search">
                        <SearchForm />
                    </header>
                    <Routes>
                        <Route path="/" element={<SignIn/>} />
                        <Route path="/Movies" element={<Movies/>} />
                        <Route path="/Television" element={<Television/>} />
                        <Route path="/Bookmark" element={<Bookmark/>} />
                        <Route path ='/sign-up' element={<SignUp/>} />
                        <Route path ='/search' element={<Search/>} />
                        <Route path="/Main" element={<ProtectedRoute><Main/></ProtectedRoute>} />
                    </Routes>
                </main>

            </div>
        </AuthContextProvider>
    </SearchInputProvider>
    </>
  );
}
export default App;
