import '../Main/Recommended/Recommended.scss';
import {useContext} from 'react';
import {DataContext} from '../../App'
import React from 'react';
import ThumbnailCreate from "../../components/Thumbnail/ThumbnailCreate";

export default function Bookmark(){
    const { media } = useContext(DataContext)
    const jsonRes = media.filter( res => res.isBookmarked === true)
    let nextId = 0;

    return(
        <>
            <h1>Bookmark</h1>
            <ThumbnailCreate jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}