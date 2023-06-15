import  "./Main.scss";
import React, {useContext} from 'react';
import Trending from "./Trending/Trending";
import Recommended from "./Recommended/Recommended";
import {DataContext} from "../../App";
export default function Main() {
    const { delaySpinner } = useContext(DataContext)
    return(
        <>
            <section className ="top-section">
                <div className="spinner" style={delaySpinner}></div>
                <h1>Trending</h1>
               <Trending/>
            </section>
            <section>
                <h1>Recommended for you</h1>
                <Recommended/>
            </section>
        </>
    )
}