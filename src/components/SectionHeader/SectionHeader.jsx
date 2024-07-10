import { Col, Container, Image, Row } from "react-bootstrap";

import styles from "./SectionHeader.module.scss";
import { borderWhite } from "../../assets";

export const SectionHeader = ({ text }) => {
  return (
    <Row className={`${styles.sectionHeader} align-items-center `}>
      <Container>
        <Col className={`${styles.borderContainer}`}>
          <Image src={borderWhite} />
        </Col>
        <Container className={`${styles.textContainer}`}>
          <h3 className='py-3'>{text}</h3>
        </Container>
      </Container>
    </Row>
  );
};
