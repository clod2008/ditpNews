import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Row, Col, Container, Image } from 'react-bootstrap'
import {  faCalendar } from '@fortawesome/free-solid-svg-icons'
import { LangSelector } from '../LangSelector'

import styles from './EventDate.module.scss'
import { logoSheraton } from '../../assets'


export const EventDate = () => {
  return (

          <Row className={styles.eventDate}>
              <Col md={6} className={`${styles.dateNum}`}>
                  <h1>
                    <FontAwesomeIcon icon={faCalendar} shake size="2xl"/>
                  </h1>
              </Col>
              <Col md={6} className={`${styles.dateNum}`} 
                >
                  <Container fluid>
                    <Row className='justify-content-center'
                    >
                      <Col>
                        <h1><LangSelector enText={'Jun 29'} esText={' 29 de junio'} /></h1>
                      </Col>
                    </Row>
                    <Row className='pt-2 pb-2 justify-content-center'>
                      <Col>
                        <Image src={logoSheraton} fluid/>
                      </Col>
                    </Row>

                  </Container>
              </Col>
          </Row>

  )
}
