import React from 'react';
import { useLocation } from 'react-router-dom'
import ThumbnailCreate from "../Thumbnail/ThumbnailCreate";

export default function Search () {
    let location = useLocation();
    let nextId = 0;

    // take input field name and search database
    const jsonRes = location.state.from.state.list;
    const jsonResQuery = location.state.from.state.query;

    return (
        <>
            <h1 style={{color:"white"}}>Found {jsonRes.length} results for {jsonResQuery}</h1>
            <ThumbnailCreate jsonRes={jsonRes} nextId = {nextId} />
        </>
    )
}