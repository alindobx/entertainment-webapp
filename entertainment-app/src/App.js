import "./assets/index.scss";
import React from 'react';
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import {createContext, useState, useEffect} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {AuthContextProvider} from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import  Movies  from "./components/Movies/Movies"
import Navigation from "./components/Nav/Navigation";
import Main from "./components/Main/Main"
import Television from "./components/Television/Television";
import Bookmark from "./components/Bookmark/Bookmark";
import Search from './components/Search/Search';
import SearchForm from "./components/Search/SearchForm";

export const DataContext = createContext(null);
const App = () => {
    const [media, setMedia] = useState([]);
    useEffect(() => {
        fetchData().then(res => console.log(res))
    },[])
    async function fetchData() {
        const response = await fetch("https://moviedb-3.onrender.com/media")
        const jsonData = await response.json();
        console.log("=================",jsonData)
        setMedia(jsonData)
    }
const location = useLocation();
  return (
    <>
        <DataContext.Provider value = {{media}}>
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
        </DataContext.Provider>
    </>
  );
}
export default App;
