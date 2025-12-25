import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { BsTrashFill } from "react-icons/bs"

const AdminReservationForAdmin = ({ reservation, handleShow, setReservationId }) => {
  return (
    <Row key={reservation._id} className="align-items-center border mb-4 p-2 shadow-sm">
      <Col className="d-flex justify-content-between align-items-center">
        <div className="fst-italic"><span className="me-2">Dátum: </span>{reservation.checkin}</div>
        <Button 
          className="rounded-0"
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
    </Row>
  )
}

export default AdminReservationForAdmin
