import React from 'react';
import movie from "../../assets/images/icon-nav-movies.svg";
import tv from "../../assets/images/icon-nav-tv-series.svg";
import { UserAuth } from '../../context/AuthContext';
import { useState } from 'react';

export default function ThumbnailCreate({nextId, jsonRes}) {
    const [ isMarked, setMarked ] = useState(false)
    //onClick put the selected bookmarks in the database
    const { onHandleClick } = UserAuth();
    const media = jsonRes;
    const page = window.location.pathname;

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await onHandleClick(e,media,nextId);

        } catch (e) {
            console.log(e.message)
        }
    }

    console.log("data coming in ======", jsonRes)

    if ( page === '/Bookmark' ) {
        console.log("Bookmark")
    }else{
        console.log("Not Bookmark")
    }

    return (
    <div key={nextId++} className="thumbnail">
        {jsonRes && jsonRes.map( (item, id) =>  (
            <section key={item.id}>
                <div className="thumbnail-container">
                    <div  className ="media-image">
                        <img className="thumbnail-image"
                             src={item.thumbnail.regular.small} alt={item.title}/>
                        <button
                            id={id}
                            onClick={(e) => [handleClick(e),setMarked(id)] }
                            className={item.isBookmarked === true
                            ? "marked" : "circle"
                        }
                            data-ele={item.title}>
                        </button>
                    </div>
                    <div className ="media-info">
                        <span className="year">{item.year}</span>
                        <span className="dot"></span>
                        <span className="movie"><img className="movie-icon"
                                                     src={ item.category === "Movie" ? movie : tv }
                                                     alt="movie"/>
                            {item.category}</span>
                        <span className="dot"></span>
                        <span className="rating">{item.rating}</span>
                    </div>
                    <div className ="media-title">{item.title}</div>
                </div>
            </section>
        ))}
    </div>
    )
}