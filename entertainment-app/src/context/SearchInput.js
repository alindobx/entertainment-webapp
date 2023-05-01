import {createContext, useState, useContext } from 'react';

const SearchInputContext = createContext('')

export const SearchInputProvider = ({children}) => {
    const { onChange } = useContext( SearchInputContext )
    const [search, setSearch] = useState ("")
    return <SearchInputContext.Provider value = {
        {search, onChange: setSearch}
    }
    >
        {children}
    </SearchInputContext.Provider>
}
export default SearchInputContext