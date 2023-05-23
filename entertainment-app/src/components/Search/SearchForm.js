import {NavLink} from "react-router-dom";
import searchIcon from "../../assets/images/icon-search.svg";
import React from "react";
import {DataContext} from '../../App'
import {useContext, useState } from 'react';

export default function SearchForm () {
    const { media } = useContext(DataContext)
    const [ show, setShow ] = useState(false)
    const [ state, setState ] = useState({
        query: '',
        list: []
    });

    const handleShowHide = () => {
        setShow(true)
    }

    const handleOnKeyDown = (e) => {
        if( e.key === "Enter" ) {
            e.preventDefault();
            window.location.href = '/Search';
            console.log("test",e.key)
            const results = media.filter((post)=>{
                if( e.target.value === "") return media;
                return post.title.toLowerCase().includes(e.target.value.toLowerCase());
            });
            setState({
                query: e.target.value,
                list: results
            });
        }
    }
    const handleSubmit = (e) => {
        console.log('data',media)
        const results = media.filter((post)=>{
            if( e.target.value === "") return media;
            return post.title.toLowerCase().includes(e.target.value.toLowerCase());
        });
        setState({
            query: e.target.value,
            list: results
        });
        console.log("search results =====",results)
        console.log("state-log", state.query, "state-list",state.list)
    }

    return (
        <>
            <form>
                <NavLink to='/Search' state={{from:{state}}}><span><img src= { searchIcon } alt="search icon" /></span></NavLink>
                <input
                    type ="search"
                    placeholder="Search for movies or TV series"
                    value = {state.query}
                    onFocus = {handleShowHide}
                    onKeyDown={handleOnKeyDown}
                    onChange={handleSubmit}
                    onBlur = {() => setShow(false)}

                />

            </form>
            <div className='search-terms' style={ show === true ? {display:"block"} : {display:"none"} }>
                <ul>
                    {state.query === ""
                        ? ""
                        : state.list.map((post) => {
                            return <NavLink key={post.id} to="/Search" state={{from:{state}}}><li>{post.title}</li></NavLink>;
                        })}
                </ul>
            </div>
        </>
    )

}