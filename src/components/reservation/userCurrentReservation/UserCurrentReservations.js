import React from 'react'
import { Row, Col } from 'react-bootstrap'

const UserCurrentReservations = ({ currentUserReservations }) => {


  return (
    <>
      {currentUserReservations.length !== 0 ? currentUserReservations.map(reservation => {
        return (
          <Col md={4} className="border shadow mx-4 mb-4 p-3">
            <Row key={reservation._id} className="flex-column">
              <Col className="d-flex justify-content-between ">
                <div className="fst-italic"><span className="me-2">Vendég: </span>{`${reservation.last_name} ${reservation.first_name}`}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Érkezés: </span>{reservation.checkin}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Távozás: </span>{reservation.checkout}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Éjszakák száma: </span>{reservation.nights}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Személy: </span>{`${reservation.persons} fő`}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Email: </span>{reservation.email}</div>
              </Col>
              <Col className="d-flex justify-content-between">
                <div className="fst-italic"><span className="me-2">Telefon: </span>{reservation.phone}</div>
              </Col>
            </Row>
          </Col>
        )
      }) : <p>nincsenek aktuális foglalások</p>}
    </>
  )
}

export default UserCurrentReservations
