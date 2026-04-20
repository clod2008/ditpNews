import { Container, Row, Col} from "react-bootstrap"
import { LangSelector } from "../LangSelector"

import styles from './HeaderText.module.scss'
import { EventDate } from "../EventDate/EventDate"
import { useEffect, useRef, useState } from "react"

export const HeaderText = ({text}) => {



    const [, setDivH] = useState(300);

    // const formAddress = 'https://docs.google.com/forms/d/e/1FAIpQLSd6K-h0KiE5D3-5dQKYNL_Vifd9PAu40QhhYZXKkUkpWq4RMg/viewform?embedded=true'
  
    const divRef= useRef(null);
    
    useEffect(()=>{
        setDivH(divRef.current.offsetHeight)
    }, [])
    
    // console.log(divH)

    return (
    <Row className={styles.wrapper}>
        <Container fluid>
            <Container>
                <Row>
                    <Col ref={divRef} id="colIz" md={6} className={`${styles.header} h-100 pb-4`}
                    >
                        <h1 className="mt-5">
                            <LangSelector enText={text.en} esText={text.es}/>
                        </h1>
                    </Col>
                    <Col md={6} className={styles.eventDate}>
                        <EventDate />
                    </Col>
                </Row>
            </Container>
        </Container>
    </Row>
  )
}
