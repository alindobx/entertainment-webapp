import React from 'react';
import { createContext } from 'react';
import movie from "../assets/images/icon-nav-movies.svg";
import tv from "../assets/images/icon-nav-tv-series.svg";

  export const createThumbnail = {

      thumbnail : (nextId,jsonRes,onHandleClick) => {
          return (
              <article key={nextId++} className="thumbnail">
                  {jsonRes && jsonRes.map( ( item, index ) =>  (
                      <section key={item.id}>
                          <section className="thumbnail-container">
                              <figure  className ="media-image">
                                  <img className="thumbnail-image"
                                       src={item.thumbnail.regular.small} alt={item.title}/>
                                  <button onClick={onHandleClick} className="circle" value={item.title}>
                                  </button>
                              </figure>
                              <figure className ="media-info">
                                  <span className="year">{item.year}</span>
                                  <span className="dot"></span>
                                  <span className="movie"><img className="movie-icon"
                                                               src={ item.category === "Movie" ? movie : tv }
                                                               alt="movie"/>
                                      {item.category}</span>
                                  <span className="dot"></span>
                                  <span className="rating">{item.rating}</span>
                              </figure>
                              <h1 className ="media-title">{item.title}</h1>
                          </section>
                      </section>
                  ))}
              </article>
          )
      }
  }

export const ThumbnailCreator = createContext(createThumbnail);

