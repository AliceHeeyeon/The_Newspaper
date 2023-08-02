import { createContext, useState } from 'react';

export const NewsContext = createContext();

export const NewsContextProvider = ({children}) => {
    const [selectedNews, setSelectedNews] = useState(null)

    return (
        <NewsContext.Provider value={{selectedNews, setSelectedNews}}>
            {children}
        </NewsContext.Provider>
    )
}
