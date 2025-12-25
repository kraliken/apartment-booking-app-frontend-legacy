import './Reservation.scss'
import { useContext, useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import userContext from '../context/user-context';
import { useHistory } from 'react-router-dom';
import useReservationApi from '../hook/useReservationApi'
import StepperForm from '../components/reservation/stepper/StepperForm';


const Reservation = ({ setPathname }) => {

  const { 
    getAllReservationsForUser, 
    reservationsToCheckin, 
    reservationsToCheckout, 
    userReserve,
    adminReserveForUser,
    isLoadingReservationsForUser,
    successReservation,
    validationErrors,
  } = useReservationApi()
  
  const { user } = useContext(userContext)
  let history = useHistory()

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

  const [checkedCheckbox, setCheckedCheckbox] = useState(false)
  const [lastCheckoutDate, setLastCheckoutDate] = useState()

  const reserveForUser = () => {
    userReserve(bookingData)
  }

  const reserveAdminForUser = () => {
    adminReserveForUser(bookingData)
  }


  if(successReservation){
    setTimeout(() => {
      setBookingData({
        checkin: "",
        firstname:  user.first_name,
        lastname: user.last_name,
        email: user.email,
        phone: "",
        persons: "",
        googleId: user.googleId
      })
    }, 4000)
  }

  useEffect(() => {
    setPathname(history.location.pathname)

    if(user && !user.admin) {
      getAllReservationsForUser()
      setBookingData({...bookingData, firstname: user.first_name, lastname: user.last_name, email: user.email, googleId: user.googleId})
    }
    if(user && user.admin) {
      getAllReservationsForUser()
      setBookingData({...bookingData, googleId: user.googleId})
    }
    
  }, [])


  return (
    <>    
      {user && (
        <Container className="current-reservations-container">
          <Row className="justify-content-center">
            <Col md={6} className="bg-white mb-4">
              <StepperForm 
                reservationsToCheckin={reservationsToCheckin}
                bookingData={bookingData}
                setBookingData={setBookingData}
                reservationsToCheckout={reservationsToCheckout}
                lastCheckoutDate={lastCheckoutDate}
                validationErrors={validationErrors} 
                setCheckedCheckbox={setCheckedCheckbox} 
                checkedCheckbox={checkedCheckbox} 
                reserveForUser={reserveForUser} 
                isLoadingReservationsForUser={isLoadingReservationsForUser}
                setLastCheckoutDate={setLastCheckoutDate}
                successReservation={successReservation}
                reserveAdminForUser={reserveAdminForUser}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

export default Reservation
