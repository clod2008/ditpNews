import {  useState } from 'react'

import { Button, Carousel, Col, Container, Image, Row } from 'react-bootstrap'

import { LangSelector } from '../LangSelector'

import styles from './CarouselFullWith.module.scss'
import { Link } from 'react-router-dom'


export const CarouselFullWith = ({data}) => {
    
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        }

  return (
    <Row className={styles.carouselFullWith}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {data.map((item, id) =>
                
                <Carousel.Item key={id}>
                    <Container>
                        <Row>
                            <Col md={3} >
                                <Image
                                    fluid
                                    src={item.img}
                                    alt={item.text.title}
                                />
                            </Col>
                            <Col className={styles.text}>
                                <Col>
                                    {
                                        <h2>
                                            <LangSelector enText={item.text.body} esText={item.textEs.body} />
                                        </h2>
                                    }
                                    <hr />
                                    {
                                        item.cta ? (
                                            <Row className='justify-content-center'>
                                                <Col md={3} className='d-grid'>
                                                    {
                                                        item.cta.to ?(
                                                        <Link
                                                            to={item.cta.to}
                                                        >
                                                            <Button>
                                                                <LangSelector enText={item.cta.text} esText={item.cta.textEs}/>
                                                            </Button>
                                                        </Link>

                                                        ) : (
                                                            <a href={item.cta.url} target='_blank' rel='noreferrer'>
                                                            <Button>
                                                                <LangSelector enText={item.cta.text} esText={item.cta.textEs}/>
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
        </Carousel>
    </Row>
  )
}
