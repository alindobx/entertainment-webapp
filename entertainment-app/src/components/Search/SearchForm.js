import {NavLink} from "react-router-dom";
import searchIcon from "../../assets/images/icon-search.svg";
import React from "react";
import {useContext, useState} from 'react';
import SearchInput from "../../context/SearchInput";


export default function SearchForm () {
    const { onChange } = useContext(SearchInput);
    const [ search, setSearch ] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(search)
    }

    return (
        <>
            <NavLink to="/Search"><img src= { searchIcon } alt="search icon" /></NavLink>
            <form onSubmit={handleSubmit} >
                <input
                    type ="text"
                    placeholder="Search for movies or TV series"
                    value = {search}
                    onChange={(e)=> {
                        setSearch(e.target.value);
                        onChange(e.target.value);
                    }}/>
            </form>
        </>
    )
}