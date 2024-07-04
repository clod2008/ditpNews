import { Button, Col, Container, Image, Row } from "react-bootstrap";
import {
  boxeoLogo,
  kickBoxing01,
  kickboxingLogo,
  mmaLogo,
  muayThaiLogo,
  thaiFestVideoHero,
} from "../assets";
import { VideoContainer } from "../components/VideoContainer/VideoContainer";

import styles from "./FestivalMuayThai2024.module.scss";

export const FestivalMuayThai2024 = () => {
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
      </Row>
      <Row>
        <Container fluid>
          <Container className={`my-5`}>
            <Row className={`justify-content-center`}>
              <Col md={12} lg={9}>
                <h1>
                  El <i>Department of International Trade Promotion</i> de
                  Tailandia invita a descubrir la excelencia en indumentaria y
                  accesorios para deportes de contacto en el Festival Muay Thai
                  2024 en Argentina
                </h1>
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
                      El 8 y el 9 de agosto, prestigiosas empresas tailandesas
                      se conectarán con Argentina para mostrar sus innovadores
                      productos de indumentaria y accesorios para deportes de
                      boxing. Participá en rondas de negocios virtuales y tené
                      reuniones directas con los fabricantes. No te pierdas esta
                      oportunidad única de descubrir lo mejor de la industria
                      tailandesa del boxing. Además, el 30 de agosto, las
                      empresas visitarán Argentina en persona para un evento
                      exclusivo. El Festival Muay Thai 2024 está patrocinado por
                      el <i>Department of International Trade Promotion</i> de
                      Tailandia (DITP). ¡Registrate ahora y asegurá tu lugar en
                      este evento exclusivo!
                    </p>

                    <Button className='w-100'>
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
    </section>
  );
};
