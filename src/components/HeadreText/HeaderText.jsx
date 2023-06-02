import { Container, Row, Col, Button } from "react-bootstrap"
import { LangSelector } from "../LangSelector"

import styles from './HeaderText.module.scss'
import { EventDate } from "../EventDate/EventDate"

export const HeaderText = ({text}) => {

    const formAddress = 'https://docs.google.com/forms/d/e/1FAIpQLSd6K-h0KiE5D3-5dQKYNL_Vifd9PAu40QhhYZXKkUkpWq4RMg/viewform?embedded=true'
  return (
    <Row className={styles.wrapper}>
        <Container fluid>
            <Container>
                <Row
                >
                    <Col md={6} className={`${styles.header}`}>
                        <Col>
                            <h1 className="mt-5">
                                <LangSelector enText={text.en} esText={text.es}/>
                            </h1>
                            <EventDate />
                        </Col>
                    </Col>
                    <Col  md={6} className={`h-100 `}>
                        <iframe

                            className={`mt-5 mb-5 ${styles.formStyle}`}
                            title="Gform"
                            src={formAddress}
                            width="100%" 
                            height="500px" 
                            frameborder="0" 
                            marginheight="0" 
                            marginwidth="0">
                                Cargando…
                        </iframe>
                    </Col>
                </Row>
            </Container>
        </Container>
    </Row>
  )
}
