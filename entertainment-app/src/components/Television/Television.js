import React from 'react';
import {useContext} from 'react';
import {DataContext} from '../../App'
import ThumbnailCreate from "../Thumbnail/ThumbnailCreate";

export default function Television() {
    const{ media } = useContext(DataContext)
    const jsonRes = media.filter( res => res.category === "TV Series")
    let nextId = 0;

    return(
        <>
            <h1>Television</h1>
            <ThumbnailCreate jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}