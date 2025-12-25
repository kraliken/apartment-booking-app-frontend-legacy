import React, { useContext, useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import userContext from '../context/user-context'
import useReservationApi from '../hook/useReservationApi'
import AdminCalendar from '../components/reservation/adminCalendar/AdminCalendar'

const ReservationForAdmin = ({ 
  setPathname
}) => {

  const { 
    reservationsToCheckin, 
    reservationsToCheckout, 
    adminDates,
    isLoadingReserveForAdmin,
    adminReserve,
    getAllReservationsForAdmin
  } = useReservationApi()
  
  const { user } = useContext(userContext)
  let history = useHistory()

  const [adminReservations, setAdminReservations] = useState({
    datesArray: [],
    adminId: ''
  })
  const [newAdminReservations, setNewAdminReservations] = useState([])

  const [bookingData, setBookingData] = useState({
    checkin: '',
    checkout: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    persons: '',
    googleId: ''
  })

  const [lastCheckoutDate, setLastCheckoutDate] = useState()

  const resrevForAdmin = async () => {
    adminReserve(newAdminReservations)
    getAllReservationsForAdmin()
    setNewAdminReservations([])
  }

  useEffect(() => {
    if(bookingData.checkin && reservationsToCheckout.length !== 0){
      const found = reservationsToCheckout.find(element => element > bookingData.checkin);
      setLastCheckoutDate(found)
    }

  }, [bookingData.checkin, reservationsToCheckout])

  useEffect(() => {

    setPathname(history.location.pathname)

     if(user && user.admin) {
      getAllReservationsForAdmin()
      setAdminReservations({...adminReservations, adminId: user.id})
    }

  }, [])

  
  return (
    <Container className="calendars">
      <Row className="justify-content-center">
        <Col md={6} >
        {/* <Col md={6} className={isLoadingReservationsForAdmin ? "d-flex justify-content-center my-5" : ""}> */}
          {/* {isLoadingReservationsForAdmin ? (
              <Spinner
                className="me-2"
                as="span"
                animation="border"
                role="status"
                aria-hidden="true"
              />
            ) : ( */}
              <AdminCalendar                    
                reservationsToCheckin={reservationsToCheckin}
                setAdminReservations={setAdminReservations}
                adminReservations={adminReservations}
                adminDates={adminDates}
                setNewAdminReservations={setNewAdminReservations}
                newAdminReservations={newAdminReservations}
              />
            {/* )
          } */}
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={4} className="m-3 p-0 text-center">
          <Button 
            className="my-4 w-50 rounded-0" 
            variant="success"
            onClick={resrevForAdmin}
            disabled={newAdminReservations.length === 0 || isLoadingReserveForAdmin}
          >
            {isLoadingReserveForAdmin && <Spinner
              className="me-2"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />}
            {!isLoadingReserveForAdmin ? "Foglalás" : "Foglalás..."}
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationForAdmin
