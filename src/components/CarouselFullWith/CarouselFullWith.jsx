/* eslint-disable no-cond-assign */
import {  useEffect, useState } from 'react'

import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap'

import { LangSelector } from '../LangSelector'

import styles from './CarouselFullWith.module.scss'
import { Link } from 'react-router-dom'
import { bannerHomeBM, carouselBMvideo, carouselBMvideo500x500 } from '../../assets'
import { isMobile } from 'react-device-detect'



export const CarouselFullWith = ({data}) => {

    const [changeVideo, setChangeVideo] = useState(false);

    useEffect(() => {
        
        if(isMobile === true && window.innerWidth < 576){
            setChangeVideo(true)
        } else { 
            setChangeVideo(false)
        }

    }, [changeVideo]);

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, ) => {
        setIndex(selectedIndex)
    }

  return (
    <Row className={styles.carouselFullWith}>
        <Carousel activeIndex={index} onSelect={handleSelect}
            className={styles.setInner}
        >
            {data.map(({text, textEs , img, interval= 2000, cta}, id) =>
                <Carousel.Item key={id} interval={interval}>
                    <Container>
                        <Row>
                            <Col md={3} >
                                <Image
                                    fluid
                                    src={img}
                                    alt={text.title}
                                />
                            </Col>
                            <Col className={styles.text}>
                                <Col>
                                    {
                                        <h2>
                                            <LangSelector enText={text.body} esText={textEs.body} />
                                        </h2>
                                    }
                                    <hr />
                                    {
                                        cta ? (
                                            <Row className='justify-content-center'>
                                                <Col md={3} className='d-grid'>
                                                    {
                                                        cta.to ?(
                                                        <Link
                                                            to={cta.to}
                                                        >
                                                            <Button>
                                                                <LangSelector enText={cta.text} esText={cta.textEs}/>
                                                            </Button>
                                                        </Link>

                                                        ) : (
                                                            <a href={cta.url} target='_blank' rel='noreferrer'>
                                                            <Button>
                                                                <LangSelector enText={cta.text} esText={cta.textEs}/>
                                                            </Button>
                                                            </a>
                                                        )
                                                    }
                                                </Col>
                                            </Row>    
                                        ): ''
                                    }
                                </Col>
                            </Col>
                        </Row>
                    </Container>
                </Carousel.Item>
            )}
                <Carousel.Item interval={15000}> 
                    <Container>
                        <Row>
                            <Col md={3}>
                                <Image fluid src={bannerHomeBM}/>
                            </Col>
                            <Col>
                                {changeVideo?(
                                    <video autoPlay muted loop
                                        src={carouselBMvideo500x500}>
                                    </video>

                                ):(
                                    <video autoPlay muted loop
                                        src={carouselBMvideo}>
                                    </video>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </Carousel.Item>
        </Carousel>
    </Row>
  )
}
