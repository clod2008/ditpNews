import { HeroImg } from '../components/HeroImg/HeroImg'
import { carouselHome, distThaiProducts, textHero } from '../data/cont'
import { CarouselFullWith } from '../components/CarouselFullWith/CarouselFullWith'

import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { CardGrid } from '../components/CardGrid/CardGrid'



export const Home = () => {
  
  return (
    <>
      <HeroImg textHero={textHero} />
      <SectionTitle titleEn='Thai News' titleEs='Noticias de Tailandia'/>
      <CarouselFullWith data={carouselHome}/>
      <SectionTitle 
        titleEn='Distribution of Thai products' 
        titleEs='Distribución de productos Tailandeses' 
        subTitleEs='Establecimientos gastronómicos que cuentan con el apoyo del DITP en Argentina'
        subTitleEn='Gastronomic establishments that have the support of the DITP in Argentina'
      />
      <CardGrid data={distThaiProducts} rows={4}/>
    </>
  )
}
