import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faFilePdf } from "@fortawesome/free-solid-svg-icons";

import { LangSelector } from "../LangSelector";
import { LangContext } from "../../context/langContex";

import styles from "./ThaiExporterList2.module.scss";



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

  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(false);
  const [is1024, setIs1024] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const checkLg = () => {
      setIs1024(window.innerWidth <= 1024);
    };
    
    checkLg();
    window.addEventListener('resize', checkLg);
    
    return () => window.removeEventListener('resize', checkLg);
  }, []);




  const [lisExpFiltred, setLisExpFiltred] = useState([]);
  const [activeSector, setActiveSector] = useState(
    sectorInicial && sectors.find(s => s.sector === sectorInicial)
      ? sectorInicial
      : sectors[initialBtn]?.sector || sectors[0]?.sector || ""
  );

  const filtrarPorSector = (array, sector) => {
    const listaFiltrada = array.filter((obj) => {
      return obj.sector === sector;
    });
    
    setLisExpFiltred(listaFiltrada);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (sectorInicial && sectors.find(s => s.sector === sectorInicial)) {
      filtrarPorSector(list, sectorInicial);
      setActiveSector(sectorInicial);
    } else if (sectors[initialBtn]) {
      filtrarPorSector(list, sectors[initialBtn].sector);
      setActiveSector(sectors[initialBtn].sector);
    } else if (sectors.length > 0) {
      filtrarPorSector(list, sectors[0].sector);
      setActiveSector(sectors[0].sector);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, initialBtn, sectorInicial]);

  const handleClick = (sector) => {
    if (sector) {
      setActiveSector(sector);
      filtrarPorSector(list, sector);
    }
  };



  const { langSelected } = useContext(LangContext);

  const buttonsSelectorWidth = 100 / sectors.length;

  // useEffect para mantener el estado filtrado y verificar el filtro seleccionado
  useEffect(() => {
    console.log("=== ESTADO DEL FILTRO ===");
    console.log("Sector activo:", activeSector);
    console.log("Lista filtrada:", lisExpFiltred);
    console.log("Cantidad de elementos filtrados:", lisExpFiltred.length);
    console.log("Descripciones disponibles:", lisExpFiltred.map(item => ({
      brand: item.brand,
      description: item.description,
      descriptionEs: item.descriptionEs
    })));
  }, [activeSector, lisExpFiltred]);

  console.log("lisExpFiltred", lisExpFiltred);
  console.log("descriptionEs:", lisExpFiltred.map(item => item.descriptionEs));

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
                onChange={handleClick}
                className={`${styles.toggleButtonGroup}`}>
                {sectors.map((data, id) => (
                  <ToggleButton
                    key={id}
                    className={styles.selector}
                    style={{ width: `${buttonsSelectorWidth}%` }}
                    value={data.sector}
                    id={`${data.sector}-${uniqueId}`}
                    name={`${data.sector}-${uniqueId}`}
                    checked={activeSector === data.sector}
                  >
                    <LangSelector enText={data.sector} esText={data.sectorEs} />
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </>
          </Row>
          <Row xs={1} md={3} className='g-4 mb-5'>
            {lisExpFiltred.map((data, id) => {
              
              return (
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
                        {Array.from(data.brand).map((brandItem, brandId) => (
                          <li key={brandId}>{brandItem}</li>
                        ))}
                      </Card.Title>
                      {
                        !is1024 && (
                          <>
                            {
                              data.description && (
                                <CardBody>
                                  <p>
                                    {/* <LangSelector enText={data.description} esText={data.descriptionEs} /> */}
                                    {data.descriptionEs}
                                  </p>
                                
                                </CardBody>
                              )
                            }
                          </>
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
              );
            })}
          </Row>
        </Container>
      </Container>
    </Row>
  );
};
