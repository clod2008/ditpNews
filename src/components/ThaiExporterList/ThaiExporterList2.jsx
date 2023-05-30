import { useContext, useEffect, useState } from "react"
import { Card, Col, Container, Image, Nav, Row, ToggleButton, ToggleButtonGroup } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faGlobe,} from '@fortawesome/free-solid-svg-icons'

import { LangSelector } from "../LangSelector";
import { LangContext } from "../../context/langContex";
import { SectionTitle } from "../SectionTitle/SectionTitle";
import { logoBM } from "../../assets";

import styles from './ThaiExporterList2.module.scss'

export const ThaiExporterList2 = ({list}) => {

    //reducer
    const sectors = list.reduce((acumulador, valorActual) => {
        const index = acumulador.findIndex(elemento => elemento.sector === valorActual.sector);
            if (index === -1) {
                acumulador.push({ sector: valorActual.sector, sectorEs: valorActual.sectorEs });
            }
            return acumulador;
        }, 
    []);

     
    const [lisExpFiltred, setLisExpFiltred] = useState([]) ;
    // const [listTitle, setlistTitle] = useState(sectors[0].sector);
 
    const filtrarPorSector = (array, sector) => {
        const listaFiltrada = array.filter((obj) => {
            return obj.sector === sector;
        });
        setLisExpFiltred(listaFiltrada)
    };
    
    useEffect(() => {
        filtrarPorSector(list, sectors[0].sector);
    }, []);
   
    const handleClick = (e)=>{
        filtrarPorSector(list, e.target.htmlFor);
        // setlistTitle(e.target.htmlFor)
    }

    const {langSelected} = useContext(LangContext)

    const buttonsSelectorWidth = 100 / sectors.length

    
    
  return (
    <Row className={styles.wrapper}>
        <Container flud>
            <Container>
                <Row className="justify-content-center mt-5 mb-5">
                    <Col md={3}>
                        <Image src={logoBM} fluid className={styles.logo}/>
                    </Col>
                    <Col>
                        <SectionTitle titleEn='Firms attending the business conference' titleEs='Lista de la delegación tailandesa'/>
                    </Col>
                </Row>
                <Row>
                    <>
                        <ToggleButtonGroup type="radio" name="options" defaultValue={sectors[0].sector} className='mb-3'>
                            {
                                Array.from(sectors).map((data, id)=>(
                                
                                <ToggleButton 
                                    key={id} 
                                    className={styles.selector} 
                                    style={{width: `${buttonsSelectorWidth}%`}}
                                    value={data.sector} 
                                    id={data.sector} 
                                    name={data.sector} 
                                    onClick={handleClick}>
                                        <LangSelector enText={data.sector} esText={data.sectorEs} />
                                </ToggleButton>

                                ))
                            }
                        </ToggleButtonGroup>
                    </>
                </Row>
                <Row xs={1} md={3} className="g-4 mb-5">

                    {
                        Array.from(lisExpFiltred).map((data,id) =>(
                            <Col key={id} className={styles.cardStyle}>
                                <Card className={`h-100`}>
                                    <Card.Header>
                                        {langSelected === 'en'?(data.sector):(data.sectorEs)}
                                    </Card.Header>

                                    <Col className={styles.cardContainer}>
                                        <h5><LangSelector esText='Marcas' enText='Brands' /></h5>
                                        <Card.Title className={styles.brandTitle}>
                                            {Array.from(data.brand).map((data,id) =>(<li key={id}>{data}</li>))}
                                        </Card.Title>
                                        <Row className="justify-content-center h-100"
                                            // style={{ backgroundColor: 'red'}}
                                        >
                                            <Card.Img variant='top' className={styles.exporterLogo} src={data.logo} alt={`logo of ${data.brand}`}/>
                                        </Row>
                                    </Col>
                                    <Card.Footer className={styles.footer}>
                                        <FontAwesomeIcon icon={faGlobe} size='1.5xl'/> 
                                        <a href={data.url} rel="noreferrer" target="_blank">{data.url}</a>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        ))
                    }
                </Row>
                
            </Container>
        </Container>
    </Row>
  )
}
