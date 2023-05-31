import React from 'react'
import { Row, Container, Col } from 'react-bootstrap'
import { LottieConatiner } from '../components/LottieContainer/LottieConatiner'
import heroVideo from '../assets/lotties/data.json'

import './HeroVideoPag.scss'

export const HeroVideoPage = () => {
  return (
    <Row
        style={{backgroundColor: 'blue'}}>
        <Container fluid>
          <Container>
            <Col>
              <LottieConatiner 
                lottieJason={heroVideo}
                viewerHeigth='40vh' 
              />
            </Col>
          </Container>
        </Container>
      </Row>
  )
}
