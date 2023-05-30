import { useContext, useEffect, useState } from "react"
import { LangContext } from '../context/langContex'



export const LangSelector = ({enText, esText}) => {

  const {langSelected} = useContext(LangContext)

  const [textSelected, settextSelected] = useState(enText);
  
  useEffect(() => {
     langSelected === 'en' ?(settextSelected(enText)) : settextSelected(esText)
   }, [useContext(LangContext)]);


  return (
    <>
    {textSelected}
    </>
  )
}
