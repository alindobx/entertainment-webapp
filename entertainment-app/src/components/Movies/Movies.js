import React from 'react';
import {useContext, useState} from 'react';
import {DataContext} from '../../App'
import {ThumbnailCreator} from "../../context/ThumbnailCreator";

export default function Movies() {
    const{media} = useContext(DataContext)
    const jsonRes = media.filter( res => res.category === "Movie")
    const mediaTitle = media.map(title => title);
    const [myData,setMyData] = useState([]);
    const createThumbnail = useContext(ThumbnailCreator)
    let nextId = 0;

    const onHandleClick = (e) => {
        const targetClicked = e.target.attributes.getNamedItem('alt').value;
        const results = media.find((x) => x.title === targetClicked)
        const index = media.find(x => x.title === targetClicked );
        console.log("bookmark", index)
        if ( results === undefined ){
            console.log("go",true)
            myData.push({id: nextId++, name: index});
            console.log("bookmark-database",myData)
        }else{
            console.log("stop",false)
        }
    }

    return(
        <>
            <h1>Movies</h1>
            {createThumbnail.thumbnail(nextId,jsonRes,onHandleClick)}
        </>
    )
}