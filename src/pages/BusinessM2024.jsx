// import React from "react";

import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { bm2024Enterprice } from "../data/cont";
import { LangSelector } from "../components/LangSelector";

export const BusinessM2024 = () => {
  return (
    <Container>
      <h1>Business Matching 2024</h1>
      <Row xs={1} md={2} className='g-4 mt-5 mb-5'>
        {bm2024Enterprice.map((data, id) => (
          <Col key={id}>
            <Card>
              <Card.Title>{data.brand}</Card.Title>
              <Card.Img src={data.logo} />
              <Card.Body>
                <h3>
                  <LangSelector
                    esText={"Agendar reunión"}
                    enText={"Schedule meeting"}
                  />
                </h3>
                <Row>
                  <Button href={data.chatRoomUrl} target='_blanck'>
                    <LangSelector
                      enText={data.charRoomName}
                      esText={data.charRoomNombre}
                    />
                  </Button>
                </Row>
              </Card.Body>
              <Card.Footer>{data.url}</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
