import logo from "../../assets/images/logo.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv,faBookmark,faFilm,faHouse } from '@fortawesome/free-solid-svg-icons'
import './Navigation.scss';
import React from "react";
import {UserAuth} from "../../context/AuthContext";
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

export default function Navigation() {
    const {user, logout} = UserAuth();
    const navigate = useNavigate();
    const [colorTv,setTV] = useState(false);
    const [bookmark,setBookMark] = useState(false)
    const [film,setFilm] = useState(false);
    const [home,setHome] = useState(false);

    if(user===null)
        console.log("user is pointing to null")
    else
        console.log("User Photo", user.photoURL)

    const handleLogOut = async () => {
        try {
            await logout()
            navigate('/Main');
            console.log("You are now logged out")
        } catch (e){
            console.log(e)
        }
    }
    const styles = {
      tvColor: { color: colorTv ? "#FC4747" : "#5A698F"},
      setBookMark : { color: bookmark ? "#FC4747" : "#5A698F"},
      setFilm : { color: film ? "#FC4747" : "#5A698F"},
      setHome : { color: home ? "#FC4747" : "#5A698F"}
    }

    return (
        <>
            <figure><img src = {logo} alt="logo"/></figure>
            <section className="nav-icons">
                <NavLink
                    onMouseEnter={()=>{setHome(true)}}
                    onMouseLeave={()=>{setHome(false)}}
                    activeclassname = "active"
                    to ='/Main'
                ><FontAwesomeIcon icon={faHouse} style = {styles.setHome}/></NavLink>
                <NavLink
                    onMouseEnter={()=>{setFilm(true)}}
                    onMouseLeave={()=>{setFilm(false)}}
                    activeclassname = "active"
                    to ='/Movies'
                ><FontAwesomeIcon icon={faFilm} style ={styles.setFilm}  /></NavLink>
                <NavLink
                    onMouseEnter={()=>{setTV(true)}}
                    onMouseLeave={()=>{setTV(false)}}
                    activeclassname = "active"
                    to ='/Television'
                ><FontAwesomeIcon icon={faTv} style = {styles.tvColor} />
                </NavLink>
                <NavLink
                    onMouseEnter={()=>{setBookMark(true)}}
                    onMouseLeave={()=>{setBookMark(false)}}
                    activeclassname = "active"
                    to ="/Bookmark"
                ><FontAwesomeIcon icon={faBookmark} style = {styles.setBookMark} />
                </NavLink>
            </section>
            <section className="account">
                <button  onClick={handleLogOut}>Log Out</button>
                <NavLink className="account-logo active"><img style={
                    user?.photoURL ? {display:"block"} : {display:"none"}
                } src = {user?.photoURL} alt="text"/></NavLink>
            </section>
        </>
    )
}