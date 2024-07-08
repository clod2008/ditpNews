import { Container, Row } from "react-bootstrap";

import styles from "./SectionHeader.module.scss";

export const SectionHeader = ({ text }) => {
  return (
    <Row className={`${styles.sectionHeader} align-items-center `}>
      <Container fluid>
        <Container>
          <h3 className='py-3'>{text}</h3>
        </Container>
      </Container>
    </Row>
  );
};
