import { Row, Col, Container, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import useScrollTo from "../hooks/useScrollTo";
import { faena } from '../assets';
import { LottieConatiner } from '../components/LottieContainer/LottieConatiner';
import bbm25Logo  from '../assets/lotties/bbm25Logo.json'
import styles from './BBM2025.module.scss'
import { ThaiExporterList2 } from '../components/ThaiExporterList/ThaiExporterList2';
import { thaiDelegationList2025Food } from '../data/thaiListExportes2025Food';
import { thaiDelegationList2025Industry } from '../data/thaiListExportes2025Industry';

// Eliminada la importación de styles

export const BBM2025 = () => {
  const scrollTo = useScrollTo();

  return (
    <>
    <div style={{padding: '2rem'}}>
      <h1>¿Es usted un empresario, jefe de compra o importador buscando expandir su negocio?</h1>
    </div>
    <Row>
        <Container fluid>
          <Container className={`my-5`}>
            <Row className={`justify-content-center`}>
              <Col md={12} lg={10}>
                <Row>
                  <Col md={12} lg={7} className='mb-5'>
              
                      <LottieConatiner lottieJason={bbm25Logo} viewerHeigth='40vh'  />
                      {/* <Image src={flag} fluid /> */}
           
                    <h1>
                      El <i>Department of International Trade Promotion (DITP) Buenos Aires</i>, 
                      con el auspicio de <i>THAI SELECT</i> y la <i>Embajada Real de Tailandia en Buenos Aires</i>, le invita a una jornada exclusiva de negocios en el lujoso Hotel Faena.
                    </h1>
                  </Col>
                  <Col className='p-2' lg={{ span: 4, offset: 1 }}>
                    <Col className={`${styles.cta01}`}>
                      <Col className={`${styles.date}`}>
                        <FontAwesomeIcon icon={faCalendar} shake size='2xl' />
                        <h2>22 de agosto</h2>
                        <span>Jornada presencial</span>
                        <hr/>
                        <p>Hotel</p>
                        <Image src={faena} fluid />
                        <br />
                        <br />
                        <p>Martha Salotti 445, C1107CMB Buenos Aires, Argentina</p>
                        <br />
                        <br />
                      </Col>
                      <Button
                        className='w-100'
                        onClick={() => scrollTo("contactFormMuayThai")}> 
                        <span className=''>¡Regístrese ahora!</span>
                      </Button>
                    </Col>
                    <Row className={`justify-content-center mt-4`}>
                      <Col>
                        <p className={`text-center mt-2`}>
                          <strong>Evento sin cargo</strong>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className={`my-5`}>
                 <ThaiExporterList2 list={thaiDelegationList2025Food} initialBtn={0}/>
                </Row>
                <Row className={`my-5`}>
                 <ThaiExporterList2 list={thaiDelegationList2025Industry} initialBtn={0}/>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </Row>
  </>
  )
}
