import arrow from "../../../assets/images/chevron-left-solid.svg";
import {DataContext} from "../../../App";
import React from 'react';
import {useState, useContext, useRef } from "react";
import { UserAuth } from '../../../context/AuthContext';
import './../Trending/Trending.scss';
import movie from "../../../assets/images/icon-nav-movies.svg";
import tv from "../../../assets/images/icon-nav-tv-series.svg";

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

    console.log("data coming in", media)
    console.log("length",validThumbnails.length)
    console.log("trending thumbnails",thumbnails)

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
            <aside className="trending-container">
                <button onClick = { handleArrowButtons } className="left-arrow" value="left">
                    <img onClick = { handleArrowClick } src={ arrow } alt="left"  />
                </button>
                <div className="trending-frame">
                    <div  className="slider" style = {{transform:`translateX(${animateLeftButton}px)`}}>
                        {media && media.map((item,index,id) =>(
                            <div key={item.id} className="media-image">
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
                                <div className="trending-banner">
                                    <div className ="media-info">
                                        <span className="year">{item.year}</span>
                                        <span className="dot"></span>
                                        <span className="movie"><img className="movie-icon"
                                                                     style = {{borderRadius: 0}}
                                                                     src={ item.category === "Movie" ? movie : tv }
                                                                     alt="movie"/>
                                            {item.category}</span>
                                        <span className="dot"></span>
                                        <span className="rating">{item.rating}</span>
                                    </div>
                                    <div className ="media-title">{item.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={ handleArrowButtons } className="right-arrow" value="right">
                    <img onClick = { handleArrowClick } src={ arrow } alt="right"  />
                </button>
            </aside>
        </>
    )
}