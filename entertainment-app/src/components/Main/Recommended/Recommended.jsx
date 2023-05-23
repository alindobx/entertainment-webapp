import './Recommended.scss';
import {useState, useContext} from 'react';
import {DataContext} from '../../../App'
import React from 'react';
import ThumbnailCreate from "../../Thumbnail/ThumbnailCreate";

export default function Recommended(){
    const { media } = useContext(DataContext)
    const jsonRes = media.map( res => res)
    let nextId = 0;

    return(
        <>
            <ThumbnailCreate jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}



