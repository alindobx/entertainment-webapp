import arrow from "../../../assets/images/chevron-left-solid.svg";
import {DataContext} from "../../../App";
import React from 'react';
import {useState, useContext, useRef } from "react";
import { UserAuth } from '../../../context/AuthContext';
import './../Trending/Trending.scss';
import movie from "../../../assets/images/icon-nav-movies.svg";
import tv from "../../../assets/images/icon-nav-tv-series.svg";
import play from "../../../assets/images/icon-play.svg";

export default function Trending  (){
    const [ isMarked, setMarked ] = useState(false)
    const { onHandleClick } = UserAuth();
    const nextId = 0;
    const { media } = useContext(DataContext)
    const windowWidth = useRef(window.innerWidth)

    const thumbnails = media.filter((movie) => movie.isTrending);
    const validThumbnails = thumbnails.filter((items) => items !== undefined);
    validThumbnails.forEach((validThumbnails, index) => index);
    let sliderNumber = 0;
    const [ animateLeftButton,setAnimateLeftButton ] = useState(sliderNumber);

    const sliderLength = (validThumbnails.length * 470) + ((validThumbnails.length - 1) * 43);
    const finalLength = sliderLength * 0.5068199841;

    const buttonPushLogic = (button) => {
        if ( button === "left" && animateLeftButton >= -finalLength ) {
            setAnimateLeftButton(prevState => prevState + -513);
        }else if( button === "right" && animateLeftButton <= 0 ){
            setAnimateLeftButton(prevState => prevState + 513);
        }else{
            console.log("not working")
        }
    }
    const handleArrowClick = (e) => {
        const attribute = e.target.attributes.getNamedItem('alt').value;
        buttonPushLogic(attribute)
    }

    const handleArrowButtons = ( e ) => {
        const buttonPushed = e.target.value;
        buttonPushLogic(buttonPushed)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await onHandleClick(e,media,nextId);

        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <>
            <section className="trending-container">
                <button onClick = { handleArrowButtons } className="left-arrow" value="left">
                    <figure><img onClick = { handleArrowClick } src={ arrow } alt="left" /></figure>
                </button>
                <article className="trending-frame">
                    <section  className="slider" style = {{transform:`translateX(${animateLeftButton}px)`}}>
                        {media && media.map((item,index,id) =>(
                            <figure key={item.id} className="media-image">
                                <section className="show-hide" style = {{height:"351px", width:"561px" }} >
                                    <button>
                                        <img src={play} alt="play cover"/>
                                        <span>Play</span>
                                    </button>
                                </section>
                                <img style={{position:"relative", zIndex:-6}}  src={
                                    windowWidth.current <= 800 ?
                                        item.thumbnail.regular.medium :
                                        item.thumbnail.regular.large
                                }
                                     alt="stars" />
                                <button
                                        onClick={(e) => [handleClick(e),setMarked(id)] }
                                        className={ item.isBookmarked === true
                                            ? "marked trending" : "circle trending"}
                                        data-ele={item.title}
                                >
                            </button>
                                <section className="trending-banner">
                                    <article className ="media-info">
                                        <span className="year">{item.year}</span>
                                        <span className="dot"></span>
                                        <span className="movie">
                                            <img className="movie-icon"
                                                 style = {{borderRadius: 0}}
                                                 src={ item.category === "Movie" ? movie : tv }
                                                 alt="movie"/>
                                            {item.category}</span>
                                        <span className="dot"></span>
                                        <span className="rating">{item.rating}</span>
                                    </article>
                                    <h1 className ="media-title">{item.title}</h1>
                                </section>
                            </figure>
                        ))}
                    </section>
                </article>
                <button onClick={ handleArrowButtons } className="right-arrow" value="right">
                    <img onClick = { handleArrowClick } src={ arrow } alt="right"/>
                </button>
            </section>
        </>
    )
}