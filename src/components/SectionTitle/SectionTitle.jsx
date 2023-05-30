import React from 'react'
import { LangSelector } from '../LangSelector'
import { Col, Container, Row } from 'react-bootstrap'

import styles from './SetionTitle.module.scss'

export const SectionTitle = ({titleEn='', titleEs='', subTitleEn, subTitleEs}) => {
  return (
    <>
        <Container className={styles.title}>
            <Row className='h-100'>
                <Col className={`${styles.headerLine} align-self-center`}>
                    <h2>
                        <LangSelector enText={titleEn} esText={titleEs} />
                    </h2>
                    {
                        subTitleEn || subTitleEs ? (
                            <h5>
                                <LangSelector enText={subTitleEn} esText={subTitleEs} />
                            </h5>
                        ):''
                    }
                </Col>
            </Row>
        </Container>
    </>
  )
}
