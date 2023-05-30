import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import heroVideo from '../assets/lotties/data.json'
import { LottieConatiner } from '../components/LottieContainer/LottieConatiner';
import { businessWheelHeaderText, thaiDelegationList2 } from '../data/cont';
import { ThaiExporterList2 } from '../components/ThaiExporterList/ThaiExporterList2';
import { HeaderText } from '../components/HeadreText/HeaderText';

export const BussinesWeel = () => {
  
  return (
    <>
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
      <HeaderText text={businessWheelHeaderText} />
      <ThaiExporterList2 list={thaiDelegationList2}/>
    </>
  )
}
