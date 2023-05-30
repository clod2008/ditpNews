
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Col, Container, Image, Nav, Row } from 'react-bootstrap'

import { LangContext } from '../../context/langContex'

import styles from './NavBar.module.scss'
import { SwitchButton } from '../SwitchButton/SwitchButton'

export const NavBar = ( {navData, brand} ) => {
    const {langSelected} = useContext(LangContext)

    
  return (
    <Row>
        <Nav className={`${styles.mainNavBar}`}>   
            <Container>
                <Row className='w-100 justify-content-between'>
                    <Col md={2}>
                        <NavLink to={'/'}>
                            <Image src={brand} className='img-fluid' />
                        </NavLink>
                    </Col>
                    <Col>
                        <Row
                            className={`${styles.navItem}`}
                        >
                                <Nav.Item>
                                    <Nav.Link className={`${styles.navLink}`}>  
                                        {navData.map((item, id) =>
                                        <Link
                                            key={id}
                                            to={ item.link }
                                        > 
                                            { langSelected ==='en' ? item.text : item.textEs }
                                            
                                        </Link>
                                    )}
                                        <SwitchButton label={langSelected} id={'lang'}/>
                                    </Nav.Link>
                                </Nav.Item>
                        </Row>   
                    </Col>
                </Row>
            </Container>
        </Nav>
    </Row>
  )
}
