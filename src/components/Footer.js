import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <Container fluid className="footer-container d-flex justify-content-center align-items-center mt-auto">
      <Row className="w-100 text-center">
        <Col>
          <p className="m-0">© 2021 Panoráma Apartman Pilisszántó - Minden jog fenntartva.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
