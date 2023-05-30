import { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { LangContext } from '../../context/langContex'

import styles from './HeroImg.module.scss'


export const HeroImg = ({textHero}) => {
  const {langSelected} = useContext(LangContext)
  return (
    <Row className={`${styles.hero} align-items-center` }
    >
      <Container
        fluid
      >
        <Container>
          <Col md={7}>
            {textHero.map((item, id) =>
              <h1
                key={id}
              >
                {langSelected === 'en'? item.text : item.textEs}
              </h1>    
            )}
          </Col>
        </Container>
      </Container>
    </Row>
  )
}
