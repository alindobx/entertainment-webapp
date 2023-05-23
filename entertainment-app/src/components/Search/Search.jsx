import React from 'react';
import {useContext, useState} from 'react';
import {DataContext} from '../../App'
import {ThumbnailCreator} from "../../context/ThumbnailCreator";
import { useLocation } from 'react-router-dom'
// import {PassSearchData} from './SearchForm'

export default function Search () {
    //data coming in
    // const  { state }  = useContext(PassSearchData)
    // console.log("Passing State", state)
    let location = useLocation();
    console.log("data", location.state.from.state.query);
    const {media} = useContext(DataContext)
    const createThumbnail = useContext(ThumbnailCreator);
    const [ myData, setMyData ] = useState([]);

    let nextId = 0;
    // take input field name and search database
    const jsonRes = location.state.from.state.list;
    const jsonResQuery = location.state.from.state.query;
    console.log("jsonRES",jsonRes)

    const onHandleClick = (e) => {
        const targetClicked = e.target.attributes.getNamedItem('alt').value;
        const results = media.find((x) => x.title === targetClicked)
        const index = media.find(x => x.title === targetClicked );
        console.log("bookmark-site", index)
        console.log('Results', results)
        if ( results === undefined ){
            console.log("go",true)
            myData.push({id: nextId++, name: index});
            console.log("bookmark-database",myData)
        }else{
            console.log("stop",false)
        }
    }

    return (
        <>
            <h1 style={{color:"white"}}>Found {jsonRes.length} results for {jsonResQuery}</h1>
            {createThumbnail.thumbnail(nextId,jsonRes,onHandleClick)}

        </>
    )
}