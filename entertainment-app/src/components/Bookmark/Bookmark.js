import '../Main/Recommended/Recommended.scss';
import {useContext} from 'react';
import {DataContext} from '../../App'
import React from 'react';
import ThumbnailBookMark from "../Thumbnail/ThumbnailBookMark";

export default function Bookmark(){
    const { media } = useContext(DataContext)
    const jsonRes = media.filter( res => res.isBookmarked === true)
    let nextId = 0;

    return(
        <>
            <ThumbnailBookMark jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}