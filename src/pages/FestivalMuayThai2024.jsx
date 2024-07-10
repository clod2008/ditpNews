import { Button, Col, Container, Image, Row } from "react-bootstrap";
import {
  borderWhite,
  boxeoLogo,
  flag,
  grunge01,
  kickBoxing01,
  kickboxingLogo,
  mmaLogo,
  muayThaiFestLogo,
  muayThaiLogo,
  thaiFestVideoHero,
} from "../assets";
import { VideoContainer } from "../components/VideoContainer/VideoContainer";

import styles from "./FestivalMuayThai2024.module.scss";
import { SectionHeader } from "../components/SectionHeader/SectionHeader";
import { boxingSport2024 } from "../data/cont";
import { Sellers } from "../components/Sellers/Sellers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { GoogleForm } from "../components/GoogleForm/GoogleForm";
import useScrollTo from "../hooks/useScrollTo";
import { useEffect, useState } from "react";
import useWindowWidth from "../hooks/useWindowWidth";

export const FestivalMuayThai2024 = () => {
  const scrollTo = useScrollTo();

  const windowWidth = useWindowWidth();

  const [formHeight, setFormHeight] = useState(1210);

  useEffect(() => {
    if (windowWidth < 768) {
      setFormHeight(1350);
    }
    if (windowWidth < 365) {
      setFormHeight(1400);
    }
  }, [windowWidth]);

  return (
    <section className={`${styles.festivalMuayThai}`}>
      <Row className={`${styles.heroVideoBanner}`}>
        <Col className={`${styles.videoContainer}`}>
          <VideoContainer
            src={thaiFestVideoHero}
            loop={true}
            autoplay='autoplay'
            muted='muted'
            type='mp4'
          />
        </Col>
        <Col className={`${styles.overVideo}`}>
          <Row className={`h-100 align-items-center`}>
            <Col></Col>
            <Col xs={9} lg={5} xl={5} xxl={3} className={``}>
              <Image src={muayThaiFestLogo} fluid />
            </Col>
            <Col></Col>
          </Row>
        </Col>
        <Col className={`${styles.overlayVideo}`}>
          <Image src={grunge01} />
        </Col>
        <Col className={`${styles.overlayVideoBorder}`}>
          <Image src={borderWhite} />
        </Col>
      </Row>
      <Row>
        <Container fluid>
          <Container className={`my-5`}>
            <Row className={`justify-content-center`}>
              <Col md={12} lg={10}>
                <Row>
                  <Col md={12} lg={7} className='mb-5'>
                    <Row className={`${styles.flag}`}>
                      <Image src={flag} fluid />
                    </Row>
                    <h1>
                      El <i>Department of International Trade Promotion</i> de
                      Tailandia invita a descubrir la excelencia en indumentaria
                      y accesorios para deportes de contacto en el Festival Muay
                      Thai 2024 en Argentina
                    </h1>
                  </Col>
                  <Col className='p-2' lg={{ span: 4, offset: 1 }}>
                    <Col className={`${styles.cta01}`}>
                      <Col className={`${styles.date}`}>
                        <FontAwesomeIcon icon={faCalendar} shake size='2xl' />
                        <h2>8 y 9 de agosto</h2>
                        <span>Reuniones virtuales</span>
                        <hr />
                        <h2>30 de agosto</h2>
                        <span>Jornada presencial</span>
                        <br />
                        <br />
                      </Col>
                      <Button
                        className='w-100'
                        onClick={() => scrollTo("contactFormMuayThai")}>
                        <span className=''>¡Registrate ahora!</span>
                      </Button>
                    </Col>
                  </Col>
                </Row>
                <Col className={`${styles.subTitle}`}>
                  <Row>
                    <Col>
                      <Image src={muayThaiLogo} />
                    </Col>
                    <Col>
                      <Image src={boxeoLogo} />
                    </Col>
                    <Col>
                      <Image src={kickboxingLogo} />
                    </Col>
                    <Col>
                      <Image src={mmaLogo} />
                    </Col>
                  </Row>
                </Col>
                <Row className={`my-5`}>
                  <Col md={5}>
                    <p>
                      <strong>El 8 y el 9 de agosto,</strong> prestigiosas
                      empresas tailandesas se conectarán con Argentina para
                      mostrar sus innovadores productos de indumentaria y
                      accesorios para deportes de boxing. Participá en rondas de
                      negocios virtuales y tené reuniones directas con los
                      fabricantes. No te pierdas esta oportunidad única de
                      descubrir lo mejor de la industria tailandesa del boxing.
                      <strong> Además, el 30 de agosto,</strong> las empresas
                      visitarán Argentina en persona para un evento exclusivo.
                      El Festival Muay Thai 2024 está patrocinado por el{" "}
                      <i>Department of International Trade Promotion</i> de
                      Tailandia (DITP).
                    </p>

                    <Button
                      className={`w-100 py-3 ${styles.cta2}`}
                      onClick={() => scrollTo("contactFormMuayThai")}>
                      ¡Registrate ahora y asegurá tu lugar en este evento
                      exclusivo!
                    </Button>
                  </Col>
                  <Col
                    md={{ span: 6, offset: 1 }}
                    className={`${styles.homeImage}`}>
                    <Image src={kickBoxing01} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      </Row>
      <SectionHeader
        text={`Descubre las empresas y sus innovadores artículos para entrenamiento en deportes de combate`}
      />
      <Row>
        <Container fluid className={`my-5`}>
          <Container>
            <Sellers sellers={boxingSport2024} />
            <Row id='contactFormMuayThai'>
              <Col lg={4} style={{ marginTop: "12px" }}>
                <Col className={`${styles.cta01}`}>
                  <Col className={`${styles.date}`}>
                    <FontAwesomeIcon icon={faCalendar} shake size='2xl' />
                    <h2>8 y 9 de agosto</h2>
                    <span>Reuniones virtuales</span>
                    <hr />
                    <h2>30 de agosto</h2>
                    <span>Jornada presencial</span>
                    <br />
                    <br />
                  </Col>
                </Col>
              </Col>
              <Col>
                <GoogleForm
                  src='https://docs.google.com/forms/d/e/1FAIpQLSdWkZ5DlEjJpC_Q_iZgFU3HZ1k8s_m5iNWebcbzzZR8_CqxMQ/viewform?embedded=true'
                  height={formHeight}
                  marginheight='0'
                  marginwidth='0'
                  title='Contactos Festuval Muay Thai 2024'
                />
              </Col>
            </Row>
          </Container>
        </Container>
      </Row>
    </section>
  );
};
