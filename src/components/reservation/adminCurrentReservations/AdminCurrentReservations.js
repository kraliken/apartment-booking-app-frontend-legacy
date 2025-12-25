import React from 'react'
import { Row, Col, Button, Spinner } from 'react-bootstrap'
import { BsTrashFill } from "react-icons/bs"
import AdminReservationForAdmin from './AdminReservationForAdmin'
import AdminReservationForUser from './AdminReservationForUser'

const AdminCurrentReservations = ({
  adminReservations,
  currentUserReservations,
  handleShow,
  setReservationId,
  isLoadingReservationsForUser
}) => {
  return (
    <>
      <Row className={isLoadingReservationsForUser ? "w-100 justify-content-center my-5" : "w-100 justify-content-between"}>
        {isLoadingReservationsForUser 
          ? (
              <Spinner
                className="me-2"
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
              />
          ) : (
              <>
              <Col md={6} xl={4}>
                <Row>
                  <h4 className="mt-2 mb-4" >admin foglalások:</h4>
                </Row>
                  {adminReservations.length !== 0 && adminReservations.map(reservation => {
                    if(reservation.email && new Date(reservation.checkin) >= new Date()) {
                      return (
                        <AdminReservationForUser
                          key={reservation._id}
                          reservation={reservation}
                          setReservationId={setReservationId}
                          handleShow={handleShow}
                          />
                      )
                    }
                  })}
                  {adminReservations.length !== 0 && adminReservations.map(reservation => {
                    if(reservation.email === undefined || reservation.calendar_eventId === null) {
                      return (
                        <AdminReservationForAdmin 
                          key={reservation._id}
                          reservation={reservation}
                          setReservationId={setReservationId}
                          handleShow={handleShow}
                        />
                      )
                    }
                  })}
                  {adminReservations.length === 0 && !isLoadingReservationsForUser && <p>nincsenek admin foglalások</p>}
              </Col>
              <Col md={6} xl={8}>
                <Row>
                  <h4 className="mt-2 mb-4">vendég foglalások:</h4>
                </Row>
                <Row>
                  {currentUserReservations.length !== 0 ? currentUserReservations.map(reservation => {
                    return (
                      <Col xl={6}>
                        <Row key={reservation._id} className="flex-column border m-1 mb-4 mt-0 p-2 shadow-sm">
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
                      </Col>
                    )
                  }) : <p>nincsenek user foglalások</p>}
                </Row>
              </Col>
            </>
          )
        }
      </Row>
    </>
  )
}

export default AdminCurrentReservations
