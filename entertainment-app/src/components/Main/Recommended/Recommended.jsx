import json from "../../../assets/data/data.json";
import './Recommended.scss';
import movie from '../../../assets/images/icon-nav-movies.svg';
import tv from '../../../assets/images/icon-nav-tv-series.svg';
import bookmarkEmpty from '../../../assets/images/icon-bookmark-empty.svg';
import { useState } from 'react';

export default function Recommended(){
    const jsonRes = json.map( res => res)
    const mediaTitle = json.map(title => title);
    const [myData,setMyData] = useState([]);
    let nextId = 0;

    const onHandleClick = (e) => {
        const targetClicked = e.target.attributes.getNamedItem('alt').value;
        const results = myData.find((x) => x.title === targetClicked)
        const index = json.find(x => x.title === targetClicked );
        console.log("bookmark", index)
            if ( results === undefined ){
                console.log("go",true)
                myData.push({id: nextId++, name: index});
                console.log(myData)
            }else{
            console.log("stop",false)
        }
    }

    console.log(mediaTitle.forEach(( item, index ) => {
        console.log(item.title, index)
    }))
    return(
        <>
            <div key={nextId++} className="thumbnail">
                {jsonRes && jsonRes.map( ( item, index ) =>  (
               <section key={item.id}>
                   <div className="thumbnail-container">
                       <div  className ="media-image">
                           <img className="thumbnail-image"
                                src={item.thumbnail.regular.small} alt={item.title}/>
                           <button onClick={onHandleClick} className="circle">
                               <img className="bookmark" src={bookmarkEmpty} alt={item.title} />
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
        </>
    )
}



