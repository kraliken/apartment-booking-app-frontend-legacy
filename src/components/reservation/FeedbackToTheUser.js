import React, { useContext } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import userContext from '../../context/user-context'

const FeedbackToTheUser = () => {

  const { user } = useContext(userContext)

  return (
    <Container className="feedback-container">
      <Row className="justify-content-center">
        <Col md={11} className="d-flex flex-column justify-content-center p-2 custom-green">
          {!user.admin && <div className="mb-3">Foglalását rögzítettük, erről hamarosan kapni fog egy megerősítő emailt.<br />Köszönjük!</div>}
          {user.admin && <div className="mb-3">Sikeres foglalás!</div>}
        </Col>
      </Row>
    </Container>
  )
}

export default FeedbackToTheUser
