
import { Row } from 'react-bootstrap';

export const PdfContainer = () => {

  return (
    <Row>
      <iframe src='https://ditp.com.ar/finalReport2023.pdf' width='100%' border='none' style={{minHeight: '80vh'}} title='Final Report'/>
    </Row>
  )
}
