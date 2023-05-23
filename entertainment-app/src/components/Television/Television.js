import React from 'react';
import {useContext} from 'react';
import {DataContext} from '../../App'
import {ThumbnailCreator} from "../../context/ThumbnailCreator";
import { UserAuth } from '../../context/AuthContext';

export default function Television() {
    const { onHandleClick } = UserAuth();
    const { myData } = UserAuth();
    const{ media } = useContext(DataContext)
    const jsonRes = media.filter( res => res.category === "TV Series")
    const createThumbnail = useContext(ThumbnailCreator)
    let nextId = 0;

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await onHandleClick(e,media,myData,nextId);
        } catch (e) {
            console.log(e.message)
        }
    }

    return(
        <>
            <h1>Television</h1>
            {createThumbnail.thumbnail(nextId,jsonRes,handleClick)}
        </>
    )
}