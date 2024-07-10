import { Card, Col, Image, Row } from "react-bootstrap";

import styles from "./Sellers.module.scss";
import { useContext } from "react";
import { LangContext } from "../../context/langContex";
import { LangSelector } from "../LangSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faShoppingBag } from "@fortawesome/free-solid-svg-icons";

export const Sellers = ({ sellers }) => {
  const { langSelected } = useContext(LangContext);

  return (
    <Row xs={1} md={3} className='g-4 mb-5'>
      {sellers.map((data, id) => (
        <Col key={id} className={styles.cardStyle}>
          <Card className={`h-100`}>
            <Card.Header>
              {langSelected === "en" ? data.sector : data.sectorEs}
            </Card.Header>

            <Card.Title className={styles.brandTitle}></Card.Title>
            <Card.Body className={`h-100`}>
              <Col className={`${styles.cardContainer} h-100`}>
                {/* <h5>
                  <LangSelector esText='Marcas' enText='Brands' />
                  </h5> */}
                {Array.from(data.brand).map((data, id) => (
                  <h4 key={id}>{data}</h4>
                ))}
                <Row className='justify-content-center h-100 align-items-center'>
                  {/* <Card.Img
                  variant='top'
                  className={styles.exporterLogo}
                  src={data.logo}
                  width={"100px"}
                  }
                /> */}
                  <Col className={`${styles.exporterLogo}`}>
                    <Image src={data.logo} alt={`logo of ${data.brand}`} />
                  </Col>
                </Row>
              </Col>
            </Card.Body>

            <Card.Footer className={styles.footer}>
              <Col className={`my-2`}>
                <FontAwesomeIcon icon={faGlobe} size='1x' />
                <a href={data.url} rel='noreferrer' target='_blank'>
                  {data.url}
                </a>
              </Col>
              {data.shop && (
                <Col className={`my-2`}>
                  <FontAwesomeIcon icon={faShoppingBag} size='1x' />
                  <a href={data.shop} rel='noreferrer' target='_blank'>
                    Shop
                  </a>
                </Col>
              )}
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
