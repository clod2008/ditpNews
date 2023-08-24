
import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button, Col, Container, Form, Image, Nav, NavDropdown, Navbar, Offcanvas, Row } from 'react-bootstrap'
import TagManager from 'react-gtm-module'

import { LangContext } from '../../context/langContex'

import styles from './NavBar.module.scss'
import { SwitchButton } from '../SwitchButton/SwitchButton'




export const NavBar = ( {navData, brand, expand} ) => {
    const {langSelected} = useContext(LangContext)

    const handleClick = (link)=>{
      TagManager.dataLayer({
        dataLayer:{
          event: 'pageview',
          pageChange: link,
        }
      })
      console.log(link)
    }

    
  return (
  
    <Navbar key={expand} expand={expand} className={`bg-body-tertiary mb-3 ${styles.mainNavBar}`}>
      <Container fluid>
        <NavLink to={'/'}>
            <Navbar.Brand className={styles.customBrand}><Image src={brand} alt='DITP logo'/></Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
            
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className={styles.customBrand} id={`offcanvasNavbarLabel-expand-${expand}`}>
              <Image src={brand} alt='DITP logo' />
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

            <Nav className={`justify-content-end flex-grow-1 pe-3 ${styles.customOffCanvas}`}>
                {navData.map((item, id ) => 
                    <div
                        key={id}
                        className={styles.customNavLink}
                        >
                        <NavLink
                            to={item.link}
                            className={({isActive }) => isActive ? styles.navActive : '' }
                            onClick={()=> handleClick(item.text, item.textEs)}  
                        >
                             { langSelected ==='en' ? item.text : item.textEs }
                        </NavLink>
                    </div>
                )}
                    <Nav.Link 
                    >  
                        <SwitchButton label={langSelected} id={'lang'}/>
                    </Nav.Link>
            </Nav>


          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>

  )
}
