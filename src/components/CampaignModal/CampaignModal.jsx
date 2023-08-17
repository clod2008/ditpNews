import { Button, Modal } from 'react-bootstrap'
import { LangSelector } from '../LangSelector'
import { IgReelEmbed } from './IgReelEmbed'

import './CampaignModal.scss'

export const CampaignModal = ({show, handleClose, iframeUrl, ariaLabel, enModalTitle, esModalTitle, socialNet}) => {
  return (
    <Modal
        id='modalMain'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="xl"
        aria-labelledby={ariaLabel}
        centered
        fullscreen={true}
    >
        <Modal.Header closeButton>
        <Modal.Title>
            <LangSelector enText={enModalTitle} esText={esModalTitle} />
        </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            {
             socialNet === 'youTube' ?
                (<iframe width="100%" height="100%" src={iframeUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>):
                (<IgReelEmbed reel={iframeUrl}/>)
            }
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            <LangSelector enText={'Close'} esText={'Cerrar'}/>
        </Button>
        </Modal.Footer>
    </Modal>
  )
}
