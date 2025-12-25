import React, { useEffect } from 'react'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import PublicCalendar from '../components/PublicCalendar'
import { HiMail } from "react-icons/hi"
import { FaMobileAlt, FaFacebookSquare, FaGoogle } from "react-icons/fa"
import useReservationApi from '../hook/useReservationApi'
import useLoginApi from '../hook/useLoginApi'


const ReservationsPublic = ({ setPathname }) => {

  console.log("get reservations");

  const {
    publicRequestForReservations,
    reservationsToCheckin,
    isLoadingReservationsForUser
  } = useReservationApi()

  const {
    getGoogleAuthUrl,
  } = useLoginApi()

  const history = useHistory()

  const handleLoginWithGoogle = async () => {
    getGoogleAuthUrl()
  }

  useEffect(() => {

    setPathname(history.location.pathname)
    publicRequestForReservations()

  }, [])


  return (
    <Container>
      <Row className="justify-content-around">
        <Col md={5} className={isLoadingReservationsForUser ? "d-flex justify-content-center align-items-center" : ""}>
          {isLoadingReservationsForUser ? (
            <Spinner
              className="me-2"
              as="span"
              animation="border"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <PublicCalendar
              reservationsToCheckin={reservationsToCheckin}
            />
          )}
        </Col>
        <Col md={5}>
          <Row className="mb-3">
            <Col>
              <p className="fs-5">Elérhetőségeink:</p>
            </Col>
          </Row>
          <Row className="ms-2 contact">
            <Col className="col-12 d-flex align-items-center mb-2">
              <HiMail className="me-3 fs-5" />
              <p className="m-0">panorama@gmail.com</p>
            </Col>
            <Col className="col-12 d-flex align-items-center mb-2">
              <FaMobileAlt className="me-3 fs-5" />
              <p className="m-0">+36 70 9999 34 43</p>
            </Col>
            <Col className="col-12">
              <FaFacebookSquare className="me-3 fs-5 facebooke-icon" />
              <a className="facebook-link" href="https://www.facebook.com/PanoramaApartmanPilisszanto" target="_blank" rel="noreferrer">Panoráma Apartman Pilisszántó</a>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <p className="fs-5">Online foglaláshoz kérlek jelentkezz be:</p>
              <Button
                variant="danger"
                className="btn ms-4 mt-4 text-lowercase rounded-0"
                onClick={handleLoginWithGoogle}
              >
                <FaGoogle className="me-2" />
                Bejelentkezés
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default ReservationsPublic
