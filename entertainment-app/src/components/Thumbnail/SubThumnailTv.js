import play from "../../assets/images/icon-play.svg";
import movie from "../../assets/images/icon-nav-movies.svg";
import tv from "../../assets/images/icon-nav-tv-series.svg";
import React from "react";

export default function SubThumbNailTv({tvArr, nextId, func, setMarked})  {
    return(
        <>
            <div key={nextId++} className="thumbnail">
                { tvArr && tvArr.map( (item, id) =>  (
                        <section key={item.id}>
                            <div className="thumbnail-container">
                                <div className="show-hide">
                                    <button>
                                        <img src={play} alt="play cover"/>
                                        <span>Play</span>
                                    </button>
                                </div>
                                <div className ="media-image">
                                    <img className="thumbnail-image"
                                         src={item.thumbnail.regular.small} alt={item.title}/>
                                    <button
                                        id={id}
                                        onClick={(e) => [func(e),setMarked(id)] }
                                        className={item.isBookmarked === true
                                            ? "marked" : "circle"
                                        }
                                        data-ele={item.title}>
                                    </button>
                                </div>
                                <div className ="media-info">
                                    <span className="year">{item.year}</span>
                                    <span className="dot"></span>
                                    <span className="movie">
                                        <img
                                            className="movie-icon"
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
        </>
    )
}