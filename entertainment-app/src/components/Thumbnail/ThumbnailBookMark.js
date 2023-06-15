import React from 'react';
import SubThumbNailMovie from "./SubThumnailMovie";
import SubThumbNailTv from "./SubThumnailTv";
import { UserAuth } from '../../context/AuthContext';
import { useState } from 'react';
export default function ThumbnailBookMark({nextId, jsonRes}) {
    const [ isMarked, setMarked ] = useState(false)
    //onClick put the selected bookmarks in the database
    const { onHandleClick } = UserAuth();
    const media = jsonRes;
    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await onHandleClick(e,media,nextId);
        } catch (e) {
            console.log(e.message)
        }
    }
    //Filtering Data for just the Movies
    const moveArr = media.filter(movie => movie.category === "Movie");

    //Filtering Data for just the Tv Series
    const tvArr = media.filter(tv => tv.category === "TV Series");

    const movieProps = { moveArr : moveArr, nextId : nextId, func : handleClick, setMarked: setMarked }
    const tvProps = { tvArr : tvArr, nextId : nextId, func : handleClick, setMarked: setMarked }

    return (
        <>
            <h1>Bookmarked Movies</h1>
            <SubThumbNailMovie {...movieProps}/>

            <h1>Bookmarked TV Series</h1>
            <SubThumbNailTv {...tvProps}/>
        </>
    )

}