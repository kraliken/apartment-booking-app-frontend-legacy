import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { BsTrashFill } from "react-icons/bs"

const AdminReservationForUser = ({ reservation, setReservationId, handleShow }) => {
  return (
    <Row key={reservation._id} className="flex-column border mb-4 p-2 shadow-sm">
      <Col className="d-flex justify-content-between my-1">
        <div className="fst-italic"><span className="me-2">Vendég: </span>{`${reservation.last_name} ${reservation.first_name}`}</div>
        <Button 
          className="delete rounded-0"
          size="sm" 
          variant="danger"
          onClick={() => {
            handleShow()
            setReservationId(reservation._id)
          }}
        >
          <BsTrashFill/>
        </Button>
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
  )
}

export default AdminReservationForUser
