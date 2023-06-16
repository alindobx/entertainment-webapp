import React from 'react';
import movie from "../../assets/images/icon-nav-movies.svg";
import tv from "../../assets/images/icon-nav-tv-series.svg";
import { UserAuth } from '../../context/AuthContext';
import { useState } from 'react';
import play from "../../assets/images/icon-play.svg";

export default function ThumbnailCreate({nextId, jsonRes}) {
    const [ isMarked, setMarked ] = useState(false)
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
    return (
    <section key={nextId++} className="thumbnail">
        {jsonRes && jsonRes.map( (item, id) =>  (
            <section key={item.id}>
                <section className="thumbnail-container">
                    <figure  className ="media-image">
                        <div className="show-hide">
                            <button>
                                <img src={play} alt="play cover"/>
                                <span>Play</span>
                            </button>
                        </div>
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
                    </figure>
                    <section className ="media-info">
                        <span className="year">{item.year}</span>
                        <span className="dot"></span>
                        <span className="movie"><img className="movie-icon"
                                                     src={ item.category === "Movie" ? movie : tv }
                                                     alt="movie"/>
                            {item.category}</span>
                        <span className="dot"></span>
                        <span className="rating">{item.rating}</span>
                    </section>
                    <h1 className ="media-title">{item.title}</h1>
                </section>
            </section>
        ))}
    </section>
    )
}