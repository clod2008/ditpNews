import { HeroImg } from '../components/HeroImg/HeroImg'
import { carouselHome, distThaiProducts, restThai, textHero } from '../data/cont'
import { CarouselFullWith } from '../components/CarouselFullWith/CarouselFullWith'

import { SectionTitle } from '../components/SectionTitle/SectionTitle'
import { CardGrid } from '../components/CardGrid/CardGrid'
import { PdfContainer } from '../components/PdfContainer/PdfContainer'
import { Container } from 'react-bootstrap'



export const Home = () => {
  
  return (
    <>
      <HeroImg textHero={textHero} />
      <SectionTitle titleEn='Thai News' titleEs='Noticias de Tailandia'/>
      <CarouselFullWith data={carouselHome}/>
      <Container>
        <SectionTitle 
          titleEn='Distribution of Thai products' 
          titleEs='Distribución de productos Tailandeses' 
          subTitleEs='Productos gastronómicos que cuentan con el apoyo del DITP en Argentina'
          subTitleEn='Gastronomic products that have the support of the DITP in Argentina'
        />
        <CardGrid data={distThaiProducts} rows={2}/>
        <SectionTitle 
          titleEn='Thai Restaurants' 
          titleEs='Restaurantes Thai' 
          subTitleEs='Establecimientos gastronómicos que cuentan con el apoyo del DITP en Argentina'
          subTitleEn='Gastronomic establishments that have the support of the DITP in Argentina'
        />
        <CardGrid data={restThai} rows={2}/>
        {/* <PdfContainer /> */}
      </Container>
    </>
  )
}
