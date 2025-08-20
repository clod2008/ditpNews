import { Row, Col, Container, Image, Button, Accordion } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import useScrollTo from "../hooks/useScrollTo";
import { bbm25LogoPrimary, logosFood, thai360, faena, logosIndustry } from '../assets';
import { LottieConatiner } from '../components/LottieContainer/LottieConatiner';
import bbm25Logo from '../assets/lotties/bbm25Logo.json'
import styles from './BBM2025.module.scss'
import { ThaiExporterList2 } from '../components/ThaiExporterList/ThaiExporterList2';
import { thaiDelegationList2025Food } from '../data/thaiListExportes2025Food';
import { thaiDelegationList2025Industry } from '../data/thaiListExportes2025Industry';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { GoogleForm } from '../components/GoogleForm/GoogleForm';
import useWindowWidth from '../hooks/useWindowWidth';
import { GoogleMap } from "../components/GoogleMap/GoogleMap";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { LangSelector } from '../components/LangSelector';
import VideoContainer from '../components/VideoContainer/VideoContainer';
import VideoContainerMultiVideo from '../components/VideoContainer/VideoContainerMultiVideo';
import { WhatsAppButtonFloat } from '../components/WhatsAppFloatBtn/WhatsAppFloatBtn';



// Eliminada la importación de styles

export const BBM2025 = () => {
  const scrollTo = useScrollTo();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [formHeight, setFormHeight] = useState(1210);
  const [videoSync, setVideoSync] = useState(logosFood);
  const [videoKey, setVideoKey] = useState(0);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 768) {
      setFormHeight(1800);
    }
    if (windowWidth < 1800) {
      setFormHeight(1400);
    }
  }, [windowWidth]);



  // Estado local sincronizado con la URL
  const getInitialKey = () => {
    if (searchParams.get('food') !== null) return '0';
    if (searchParams.get('industry') !== null) return '1';
    return null; // default - acordeón cerrado
  };
  const [activeAccordion, setActiveAccordion] = useState(getInitialKey());


  // Sincronizar con la URL al cambiar el acordeón
  const handleAccordionChange = (key) => {
    console.log('handleAccordionChange called with key:', key);
    
    // Si se hace click en el mismo item que está abierto, cerrarlo
    if (activeAccordion === key) {
      setActiveAccordion(null);
      // Limpiar parámetros de la URL
      window.history.replaceState(null, '', window.location.pathname);
      console.log('Closing accordion, clearing URL');
    } else {
      // Abrir el nuevo item
      setActiveAccordion(key);
      
      // Limpiar parámetros anteriores y agregar el nuevo
      if (key === '0') {
        window.history.replaceState(null, '', '?food');
        console.log('Setting URL to ?food');
      } else if (key === '1') {
        window.history.replaceState(null, '', '?industry');
        console.log('Setting URL to ?industry');
      }
    }
  };

  // Si cambia la URL (ej: navegación), actualizar el acordeón abierto
  useEffect(() => {
    const foodParam = searchParams.get('food');
    const industryParam = searchParams.get('industry');
    
    if (foodParam !== null && activeAccordion !== '0') {
      setActiveAccordion('0');
    } else if (industryParam !== null && activeAccordion !== '1') {
      setActiveAccordion('1');
    } else if (foodParam === null && industryParam === null && activeAccordion !== null) {
      // Si no hay parámetros, cerrar el acordeón
      setActiveAccordion(null);
    }
    // eslint-disable-next-line
  }, [location.search]);

  // Calcular sectores únicos para food
  // eslint-disable-next-line no-unused-vars
  const sectorsFood = thaiDelegationList2025Food.reduce((acum, val) => {
    if (!acum.find(s => s.sector === val.sector)) {
      acum.push({ sector: val.sector, sectorEs: val.sectorEs });
    }
    return acum;
  }, []);

  const handleGoogleMap = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (activeAccordion === '0') {
      setVideoSync(logosFood);
      setVideoKey(prev => prev + 1);
    } else if (activeAccordion === '1') {
      setVideoSync(logosIndustry);
      setVideoKey(prev => prev + 1);
    }
  }, [activeAccordion]);



  // Función para obtener el nombre del archivo del video
  const getVideoFileName = (videoSrc) => {
    if (videoSrc === logosFood) return 'logosFood';
    if (videoSrc === logosIndustry) return 'logosIndustry';
    return 'unknown';
  };




  return (
    <section className={`${styles.bbm25}`}>
      {/* No arreglar el tabulador */}
      <WhatsAppButtonFloat message={`Hola,
Me gustaría recibir más información sobre el Buenos Aires Business Matching 2025
Empresa: `} />
      {/* No arreglar el tabulador */}
      <Row className={`${styles.heroVideoBanner}`} >
        <Container fluid className={`${styles.heroVideoBannerTextContainer}`}>
          <Container className='h-100 d-flex align-items-center' >
            <Col className={`${styles.heroVideoBannerText} `} >
              <h1>Impulsá tu Negocio con Innovación Tailandesa</h1>
              <p><span>Buenos Aires Business Matching 2025</span> <br />
                Un evento exclusivo organizado por DITP (Departamento de Promoción de Comercio Internacional, Ministerio de Comercio de Tailandia), con el apoyo de <a href="https://www.thaiselect.com/" target="_blank" rel="noopener noreferrer">Thai Select</a></p>
              <h2>¡Una oportunidad única para expandir tus horizontes comerciales!</h2>
              {/* <h1>¿Es usted un empresario, jefe de compra o importador buscando expandir su negocio?</h1>
              <h2>Únase a nuestro exclusivo evento Buenos Aires Business Matching 2025 en el lujoso Hotel Faena.</h2> */}
            </Col>
          </Container>
        </Container>
        <Col className={`${styles.videoContainer}`}>
          <VideoContainer
            key={`${getVideoFileName(videoSync)}-${videoKey}`} // Forzar re-renderizado cuando cambie el video
            src={videoSync}
            loop={true}
            autoplay='autoplay'
            muted='muted'
            type='webm'
          />
        </Col>
        <Col className={`${styles.videoContainerMultiVideo}`}>
          <VideoContainerMultiVideo
            src={thai360}
            loop={true}
            autoplay='autoplay'
            muted='muted'
            type='webm'
          />
        </Col>
      </Row>

      <Row>
        <Container fluid>
          <Container className={`my-5`}>
            <Row className={`justify-content-center`} >
              <Col md={12} lg={10}>
                <Row>
                  <Col md={12} lg={7} className='mb-5'>
                    <Col className='mb-3'>
                      <LottieConatiner lottieJason={bbm25Logo} viewerHeigth='20vh' />
                    </Col>
                    <h3>¿Por qué participar?</h3>
                    <ul>
                      <li>Reuniones con empresas tailandesas líderes en innovación y calidad</li>
                      <li>Oportunidades para ampliar y diversificar su red de proveedores y clientes</li>
                      <li>Acceso a productos y soluciones innovadoras para su negocio</li>
                      <li>Participación en un evento internacional en un entorno de lujo y confianza</li>
                    </ul>
                    <h3>¿Para quién es esto?</h3>
                    <p>Si usted es un empresario, jefe de compras, importador o productor en busca de nuevos mercados y socios en sectores de alimentos y bebidas o industrial, ¡este evento es para usted!</p>
                    {/* <h2>
                    Buenos Aires Business Matching 2025 es organizado por el DITP (Departamento de Promoción de Comercio Internacional, Ministerio de Comercio de Tailandia). Con el apoyo de la Embajada Real de Tailandia y Thai Select, este encuentro único reúne a las mejores empresas y expertos para explorar nuevas oportunidades de negocio y establecer conexiones valiosas. No pierda la oportunidad de fortalecer su red comercial y descubrir colaboraciones estratégicas en un ambiente de lujo.
                    </h2> */}
                  </Col>
                  <Col className='p-2' lg={{ span: 4, offset: 1 }}>
                    <Col className={`${styles.cta01}`}>
                      <Col className={`${styles.date}`}>
                        <FontAwesomeIcon icon={faCalendar} shake size='2xl' />
                        <h2>22 de agosto</h2>
                        <span>Jornada presencial</span>
                        <hr />
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
                        onClick={() => scrollTo("contactFormBBM2025")}>
                        <span className=''>Cupos Limitados ¡Regístrese ahora!</span>
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

                <Row className=' mt-5 align-items-end mb-3'>
                  <Col md={4} className='d-flex align-items-end pb-2'>
                    <Image src={bbm25LogoPrimary} fluid />
                  </Col>
                  <Col className='text-left h-100 d-flex align-items-end'>
                    <h3 style={{ marginBottom: '0px' }}>
                      <LangSelector enText='Firms attending the business conference' esText='Empresas Tailandesas Participantes en Alimentos, Bebidas y Sector Industrial en Buenos Aires' />
                    </h3>
                  </Col>
                </Row>
                <Row className={`my-1`} id='firmsAttending'>
                  <Accordion activeKey={activeAccordion}
                    style={{ paddingLeft: '0px', paddingRight: '0px' }}
                  >
                    <Accordion.Item eventKey='0'>
                      <Accordion.Header onClick={() => handleAccordionChange('0')}>
                        Alimentos y Bebidas
                      </Accordion.Header>
                      <Accordion.Body>
                        <ThaiExporterList2
                          list={thaiDelegationList2025Food}
                          initialBtn={0}
                          uniqueId="food"
                          queryKey="tabFood"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey='1'>
                      <Accordion.Header onClick={() => handleAccordionChange('1')}>
                        Industria y Autopartes
                      </Accordion.Header>
                      <Accordion.Body>
                        <ThaiExporterList2
                          list={thaiDelegationList2025Industry}
                          initialBtn={0}
                          uniqueId="industry"
                          queryKey="tabIndustry"
                        />
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Row>
              </Col>
            </Row>
            <Row id='contactFormBBM2025' className='justify-content-center mt-5 pt-5'>
              <Col md={12} lg={10}>
                <Row className='g-5'>
                  <Col lg={4}>
                    <Image src={bbm25LogoPrimary} fluid />
                    <Col className='mt-5 '>
                      <Image src={faena} fluid />
                      <p className='mt-3'>Martha Salotti 445, C1107CMB Buenos Aires, Argentina</p>
                    </Col>
                    <Col
                      className='mt-1 mb-2'
                      style={{
                        overflow: "hidden",
                        borderRadius: "18px",
                      }}>
                      {isMobile ? (
                        <Link
                          to='#'
                          onClick={() => {
                            handleGoogleMap(
                              "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1641.8056973449343!2d-58.36262787908879!3d-34.61398689706156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d7bd11f6df%3A0xdb7e986debba8d17!2sHotel%20Faena!5e0!3m2!1ses!2sar!4v1753473891955!5m2!1ses!2sar"
                            );
                          }}>
                          Ver en GoogleMap (Mobile)
                        </Link>
                      ) : (
                        <GoogleMap

                          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1641.8056973449343!2d-58.36262787908879!3d-34.61398689706156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a334d7bd11f6df%3A0xdb7e986debba8d17!2sHotel%20Faena!5e0!3m2!1ses!2sar!4v1753473891955!5m2!1ses!2sar'
                          height={formHeight / 2}
                          marginheight='0'
                          marginwidth='0'
                          title='Contactos Festuval Muay Thai 2024'
                        />
                      )}
                    </Col>
                  </Col>
                  <Col className='text-center p-5'>
                    {/* <GoogleForm
                      src='https://forms.gle/YeZsEbyqnz6sFYFR6'
                      height={formHeight}
                      marginheight='0'
                      marginwidth='0'
                      title='Contactos Festuval Muay Thai 2024'
                    /> */}
                    <h3>Ya no quedan espacios disponibles para las reuniones. Por favor comuníquese con nosotros para ingresar a la lista de espera</h3>
                  </Col>

                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </Row>
      <Container>
        <Row className='justify-content-center'>
          <Col md={8} className='text-center my-5'>
          <Col>
            Consultas: 
            <strong> 
              <a 
                href="mailto:thaib2b@ttc-ba.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='text-decoration-none'
                style={{color: 'var(--primary)'}}
              >
              thaib2b@ttc-ba.com</a></strong>
          </Col>
            <br/>
            Para más información sobre las actividades del DITP y oportunidades en comercio internacional, visita<br/>
            <strong>
              <a 
                href="https://www.ditp.go.th/en" 
                target="_blank" 
                rel="noopener noreferrer"
                className='text-decoration-none'
                style={{color: 'var(--primary)'}}
              >
                https://www.ditp.go.th/en
              </a>
            </strong>
          </Col>

        </Row>
      </Container>
    </section>
  )
}
