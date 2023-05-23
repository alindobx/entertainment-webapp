import  "./Main.scss";
import React from 'react';
import Trending from "./Trending/Trending";
import Recommended from "./Recommended/Recommended";

export default function Main() {
    return(
        <>
            <section className ="top-section">
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