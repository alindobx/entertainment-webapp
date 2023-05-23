import arrow from "../../../assets/images/chevron-left-solid.svg";
import {DataContext} from "../../../App";
import React from 'react';
import {useState, useContext } from "react";

export default function Trending  (){
    const { media } = useContext(DataContext)
    const thumbnails = media.map((movie) => movie.thumbnail?.trending);
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

    return (
        <>
            <aside className="trending-container">
                <button onClick = { handleArrowButtons } className="left-arrow" value="left">
                    <img onClick = { handleArrowClick } src={ arrow } alt="left"  />
                </button>
                <div className="trending-frame">
                    <div  className="slider" style = {{transform:`translateX(${animateLeftButton}px)`}}>
                        {validThumbnails && validThumbnails.map((movie,index) =>(
                            <img key={index}  src={movie.small} alt="stars" />
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