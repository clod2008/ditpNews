import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Image,
  Nav,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faFilePdf } from "@fortawesome/free-solid-svg-icons";

import { LangSelector } from "../LangSelector";
import { LangContext } from "../../context/langContex";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { logoBM } from "../../assets";

import styles from "./ThaiExporterList2.module.scss";
import GoogleSchedulingButton from "../GoogleSchedulingButton/GoogleSchedulingButton ";

export const ThaiExporterList2 = ({ list, initialBtn = 0, sectorInicial, uniqueId = "default" }) => {
  //reducer
  const sectors = list.reduce((acumulador, valorActual) => {
    const index = acumulador.findIndex(
      (elemento) => elemento.sector === valorActual.sector
    );
    if (index === -1) {
      acumulador.push({
        sector: valorActual.sector,
        sectorEs: valorActual.sectorEs,
      });
    }
    
    return acumulador;
  }, []);

  const [lisExpFiltred, setLisExpFiltred] = useState([]);
  const [activeSector, setActiveSector] = useState(
    sectorInicial && sectors.find(s => s.sector === sectorInicial)
      ? sectorInicial
      : sectors[initialBtn]?.sector || ""
  );

  const filtrarPorSector = (array, sector) => {
    const listaFiltrada = array.filter((obj) => {
      return obj.sector === sector;
    });
    setLisExpFiltred(listaFiltrada);
  };

  useEffect(() => {
    if (sectorInicial && sectors.find(s => s.sector === sectorInicial)) {
      filtrarPorSector(list, sectorInicial);
      setActiveSector(sectorInicial);
    } else {
      filtrarPorSector(list, sectors[initialBtn].sector);
      setActiveSector(sectors[initialBtn].sector);
    }
  }, [list, initialBtn, sectorInicial]);

  const handleClick = (e) => {
    const sector = e.target.value;
    setActiveSector(sector);
    filtrarPorSector(list, sector);
  };

  const { langSelected } = useContext(LangContext);

  const buttonsSelectorWidth = 100 / sectors.length;



  return (
    <Row className={styles.wrapper}>
      <Container fluid>
        <Container>
          <Row>
            <>
              <ToggleButtonGroup
                type='radio'
                name={`options-${uniqueId}`}
                value={activeSector}
                className='mb-3'>
                {Array.from(sectors).map((data, id) => (
                  <ToggleButton
                    key={id}
                    className={styles.selector}
                    style={{ width: `${buttonsSelectorWidth}%` }}
                    value={data.sector}
                    id={`${data.sector}-${uniqueId}`}
                    name={`${data.sector}-${uniqueId}`}
                    onClick={handleClick}
                    checked={activeSector === data.sector}
                  >
                    <LangSelector enText={data.sector} esText={data.sectorEs} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </>
          </Row>
          <Row xs={1} md={3} className='g-4 mb-5'>
            {Array.from(lisExpFiltred).map((data, id) => (
              <Col key={id} className={styles.cardStyle}>
                <Card className={`h-100`}>
                  <Card.Header>
                    {langSelected === "en" ? data.sector : data.sectorEs}
                  </Card.Header>

                  <Col className={`${styles.cardContainer} `}>
                    <h5>
                      <LangSelector esText='Marcas' enText='Brands' />
                    </h5>
                    <Card.Title className={styles.brandTitle}>
                      {Array.from(data.brand).map((data, id) => (
                        <li key={id}>{data}</li>
                      ))}
                    </Card.Title>
                    {
                      data.description && (
                        <CardBody>
                          <p>
                            <LangSelector enText={data.description} esText={data.descriptionEs} />
                          </p>
                        
                        </CardBody>
                      )
                    }
                    <Row
                      className='justify-content-center h-100'
                      // style={{ backgroundColor: 'red'}}
                    >
                      <Card.Img
                        variant='top'
                        className={styles.exporterLogo}
                        src={data.logo}
                        alt={`logo of ${data.brand}`}
                      />
                    </Row>

                  </Col>

                  <Card.Footer className={styles.footer}>
                    <FontAwesomeIcon icon={faGlobe} size='1x' />
                    <a href={data.url} rel='noreferrer' target='_blank'>
                      {data.url}
                    </a>
                    {
                      data.catalogUrl && (
                        <Col>
                          <br />
                          <FontAwesomeIcon icon={faFilePdf} size='1x' />
                          <a href={data.catalogUrl} rel='noreferrer' target='_blank'>
                            Ver catálogo
                          </a>
                        </Col>
                      )
                    }
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </Row>
  );
};
