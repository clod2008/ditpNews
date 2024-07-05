import { Row, Col, Card, Container, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

import { LangSelector } from "../LangSelector";

import styles from "./CardGrid.module.scss";
import TagManager from "react-gtm-module";

export const CardGrid = ({ data, rows: rowsMd = 2 }) => {
  const handleClick = (id) => {
    TagManager.dataLayer({
      dataLayer: {
        event: id,
        //   pageChange: id,
      },
    });
    //   console.log(id)
  };

  return (
    <Container>
      <Row xs={1} md={rowsMd} className={`g-4 ${styles.cardGrid}`}>
        {Array.from(data).map((data, id) => (
          <Col key={id}>
            <Card className='h-100'>
              <Card.Img variant='top' src={data.img} alt={data.title} />
              <Card.Body>
                <Card.Title>
                  <h2>
                    <LangSelector enText={data.title} esText={data.titleEs} />
                  </h2>
                </Card.Title>
                <Card.Title>
                  <h3>
                    <LangSelector
                      enText={data.subTitle}
                      esText={data.subTitleEs}
                    />
                  </h3>
                </Card.Title>
                <hr />
                <Card.Text>
                  <LangSelector enText={data.body} esText={data.bodyEs} />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                {data.contact.length !== 0 ? (
                  <>
                    <h4>
                      <LangSelector enText='Contacts' esText='Contáctos' />
                    </h4>
                    {Array.from(data.contact).map((item, id) => (
                      <Accordion key={id}>
                        <Accordion.Item eventKey={item.name}>
                          <Accordion.Header className={styles.accordionHeader}>
                            {item.name}
                          </Accordion.Header>
                          <Accordion.Body className={styles.accordionBody}>
                            <LangSelector
                              enText={`Address: ${item.address}`}
                              esText={`Dirección: ${item.address}`}
                            />
                            <br />
                            {item.phone ? (
                              <>
                                <LangSelector
                                  enText='Phones:'
                                  esText='Teléfonos:'
                                />
                                <ul>
                                  {Array.from(item.phone).map((item, id) => (
                                    <li key={id}>
                                      <FontAwesomeIcon icon={faPhoneAlt} />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            ) : (
                              ""
                            )}
                            <br />
                            {item.url ? (
                              <a
                                id={item.gTagId}
                                href={item.url}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={item.name}
                                className='cardLinkSaberMas'
                                onClick={() => {
                                  handleClick(item.gTagId);
                                }}>
                                <LangSelector
                                  enText={"Learn More ==>"}
                                  esText={"Saber Más ==>"}
                                />
                              </a>
                            ) : (
                              ""
                            )}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}
                    <hr />
                  </>
                ) : (
                  ""
                )}
                <Row className={styles.socialIcons}>
                  {Array.from(data.socialMedia).map((item, id) => (
                    <Col key={id}>
                      <a
                        className='partnerSocialButton'
                        href={item.url}
                        target='_blanck'
                        aria-label={item.net}>
                        <FontAwesomeIcon icon={item.faIcon} size='2xl' />
                      </a>
                    </Col>
                  ))}
                </Row>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
