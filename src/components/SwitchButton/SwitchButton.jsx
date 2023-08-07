import { useContext} from 'react';
import { LangContext } from '../../context/langContex';
import { Col, Image, Row } from 'react-bootstrap';

import styles from './SwitchButton.module.scss'
import { enFlag, esFlag } from '../../assets';

export const SwitchButton = ({label}) => {

  const { setLangSelected} = useContext(LangContext)
  const {langSelected} = useContext(LangContext)
  

  return (
    <>
      <Row
        className={styles.langSwitch}
      >
        {
          langSelected === 'en'?(
          <Col
            className={styles.langFlag}
            disabled
            style={{filter:' grayscale(100%)'}}
          >
            <Image src={enFlag} alt='English Flag' />

          </Col> ):
          <Col
            className={styles.langFlag}
            onClick={()=>{setLangSelected('en')}}
          >
            <Image src={enFlag} alt='English Flag'/>

          </Col>
        }
        {
          langSelected === 'es'?(
          <Col
          className={styles.langFlag}
          disabled
          style={{filter:' grayscale(100%)'}}
          >
            <Image src={esFlag} alt='Bandera Española' />
          </Col>):
          <Col
            className={styles.langFlag}
            onClick={()=>setLangSelected('es')}
          >
          <Image src={esFlag} alt='Bandera Española'/>

          </Col>  
        }
      </Row>
    </>
  )
}
