import {useContext} from 'react';
import SearchInput from "../../context/SearchInput";
import json from "../../assets/data/data"


export default function Search () {
    //User enters query into input field
    const { search } = useContext(SearchInput)
    //take input field name and search database
    console.log(search)
    const searchResults = json.filter((titles) => {
        if(titles.category === search ) {
            console.log("titles", titles)
            return titles
        }else{
            console.log("Not Found");
        }
    })

    const finalList = searchResults.map((movies) => movies.thumbnail?.regular.small)
    console.log("finalist",finalList)




    return (
        <>
            <h1 style={{color:"white"}}>Found {search.length} results for {search}</h1>
            <figure>
                {
                    finalList && finalList.map((smallURL) => (
                            <img src={smallURL} alt="movies" />
                        )
                    )
                }
            </figure>
        </>
    )
}