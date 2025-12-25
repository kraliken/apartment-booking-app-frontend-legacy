import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Button, Modal, Spinner } from 'react-bootstrap';
import userContext from '../context/user-context';
import './CurrentReservation.scss'
import useReservationApi from '../hook/useReservationApi';
import UserCurrentReservations from '../components/reservation/userCurrentReservation/UserCurrentReservations';
import AdminCurrentReservations from '../components/reservation/adminCurrentReservations/AdminCurrentReservations';
import { useHistory } from 'react-router-dom';

const CurrentReservation = ({ setPathname }) => {

  const { user } = useContext(userContext)
  const history = useHistory()

  const { 
    getCurrentReservationsForUser, 
    getCurrentReservationsForAdmin,
    adminReservations,
    currentUserReservations,
    deleteReservation,
    isLoadingDeleteReservation,
    handleClose,
    handleShow,
    show,
    isLoadingReservationsForUser

  } = useReservationApi()

  console.log(adminReservations);

  const [reservationId, setReservationId] = useState("");  

  const handleDeleteReservation = async (id) => {
    deleteReservation(id)
  }

  useEffect(() => {

    setPathname(history.location.pathname)
    
    user.admin ? getCurrentReservationsForAdmin() : getCurrentReservationsForUser()

  }, [])

  return (
    <Container className="container-xl d-flex justify-content-center">
      <Row className={currentUserReservations.length % 2 === 0 ? "w-100 justify-content-center" : "w-100 justify-content-start"}>
        {user && user.admin ? (
          <AdminCurrentReservations 
            adminReservations={adminReservations}
            currentUserReservations={currentUserReservations}
            handleShow={handleShow}
            setReservationId={setReservationId}
            isLoadingReservationsForUser={isLoadingReservationsForUser}
          />
       
        ) : (
          <UserCurrentReservations
            currentUserReservations={currentUserReservations}
          />
        )}

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          className="rounded-0"
        >
          <Modal.Header closeButton>
            <Modal.Title>Foglalás törlés</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Biztosan törölni szeretnéd ezt a foglalást?
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="secondary" 
              className="w-25 rounded-0"
              onClick={() =>
                handleClose()
              }>
              Mégsem
            </Button>
          <Button 
            className="w-25 rounded-0" 
            variant="danger"
            onClick={() => handleDeleteReservation(reservationId)}
            disabled={isLoadingDeleteReservation}
          >
            {isLoadingDeleteReservation && <Spinner
              className="me-2"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
            {!isLoadingDeleteReservation ? "Törlés" : "Törlés..."}
          </Button>
          </Modal.Footer>
        </Modal>        
      </Row>
    </Container>
  )
}

export default CurrentReservation
