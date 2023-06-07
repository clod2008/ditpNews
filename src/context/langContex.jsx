import { createContext, useState } from "react"

export const LangContext = createContext()

export function LangContextProvider( {children} ){

    const [langSelected, setLangSelected] = useState('es')

    const lang = {langSelected, setLangSelected}

    return(

        <LangContext.Provider value={lang}>
            {children}
        </LangContext.Provider>


    )

}