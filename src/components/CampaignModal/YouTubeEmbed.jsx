import { Row } from 'react-bootstrap'

export const YouTubeEmbed = ({urlVideo}) => {
  return (
    <Row style={{backgroundColor: 'red'}}>
        <iframe width="100%" height="100%" src={urlVideo} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </Row>
  )
}
