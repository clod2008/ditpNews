import React from 'react'
import { ThaiExporterList2 } from '../components/ThaiExporterList/ThaiExporterList2'
import { thaiDelegationList2 } from '../data/cont'

export const FoodPage = () => {
  return (
    <ThaiExporterList2 list={thaiDelegationList2} initialBtn={2}/>
  )
}
