import { Col, Container } from 'react-bootstrap'
import { InstagramEmbed } from 'react-social-media-embed';

export const IgReelEmbed = ({reel}) => {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
        <Col md={8} >
            <InstagramEmbed 
                url={`https://www.instagram.com/p/${reel}/`} 
                width={'100%'}
            />
        </Col>
    </Container>
  )
}
