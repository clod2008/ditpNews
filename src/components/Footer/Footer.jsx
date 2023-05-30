
import { Col, Container, Image, Row } from 'react-bootstrap'
import styles from './Fotter.module.scss'
import { logoTTC } from '../../assets'

export const FooterPage = () => {
  return (
    <Row>
    <footer
      className={styles.footerPage}
    > 

      <Container>
        <Row className={`${styles.logo} h-100`}>
          <Col md={3} className='text-center'>
            <a href='https://www.ditpthinkthailand.com/' target='_blanck'>
            <Image src={logoTTC} fluid />
            </a>
            <Col className={styles.poweredBy}>
              <a href='http://www.apsis.com.ar' target='_blank' rel='noreferrer'>
                   Powered by APSIS &copy; 
              </a>
            </Col>
          </Col>
        </Row>
      </Container>
    </footer>
    </Row>
  )
}
