
import { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Campaigns.module.scss'
import { CampaignModal } from '../components/CampaignModal/CampaignModal'
import { campaign } from '../data/cont'
import { LangSelector } from '../components/LangSelector'



export const Campaigns = () => {
  
  // Modals def
  const [enModalTitle, setEnModalTitle] = useState('');
  const [esModalTitle, setEsModalTitle] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [socialNet, setSocialNet] = useState('');


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow  =  (url, title, net) => {
    setEnModalTitle(title.En)
    setEsModalTitle(title.Es)
    setSocialNet(net)
    setIframeUrl(url)
    setShow(true)
  };

  return (
    <Container fluid className='pb-5'>
      <Container>
        <Row className='mt-5 mb-5'>
          {
            Array.from(campaign).map((item,id)=>(
              <Col key={id} md={6} sx={12} className='mb-5 mt-5'>
                <h2><LangSelector enText={item.title.En} esText={item.title.Es}/></h2>
                <Card className='h-100'>
                  <Card.Img variant='top' src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.actor}</Card.Title>
                    <Card.Text>
                      <LangSelector enText={item.decription.En} esText={item.decription.Es}/>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className='pb-4'>
                    <Card.Title>Videos:</Card.Title>
                    <Row className={`${styles.videoLouncher} d-grid gap-3`}>
                      {
                        Array.from(item.videos).map((item, id)=>(
                          <Button className='campaignVideos' key={id} onClick={() => handleShow(item.iframeUrl, item.title, item.socialNet)}>
                              <FontAwesomeIcon icon={item.icon} size='2xl'/>
                              <br/>
                              <span><LangSelector enText={item.title.En} esText={item.title.Es}  /></span>
                          </Button>
                        ))
                      }
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            )
          )}
            <CampaignModal 
              show={show} 
              handleClose={handleClose} 
              enModalTitle={enModalTitle} 
              esModalTitle={esModalTitle} 
              iframeUrl={iframeUrl}
              socialNet={socialNet}
            />
        </Row>
      </Container>
    </Container>
  )
}
