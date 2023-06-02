import React from 'react';
import {useContext, useState} from 'react';
import {DataContext} from '../../App'
import ThumbnailCreate from "../Thumbnail/ThumbnailCreate";

export default function Movies() {
    const{media} = useContext(DataContext)
    const jsonRes = media.filter( res => res.category === "Movie")
    let nextId = 0;

    return(
        <>
            <h1>Movies</h1>
            <ThumbnailCreate jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}