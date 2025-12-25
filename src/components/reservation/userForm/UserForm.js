import React, { useContext } from 'react'
import { Col, Form, Button, Spinner } from 'react-bootstrap'
import userContext from '../../../context/user-context'
// import useReservationApi from '../../../hook/useReservationApi'

const UserForm = ({ 
  bookingData, 
  validationErrors, 
  setBookingData, 
  setCheckedCheckbox, 
  checkedCheckbox, 
  reserveForUser, 
  isLoadingReservationsForUser,
}) => {
  
  const { user } = useContext(userContext)

  const handleCheckbox = (e) => {
    if(e.target.checked){
      setBookingData({...bookingData, firstname: "", lastname: "", email: ""})
    }else{
      setBookingData({...bookingData, firstname: user.first_name, lastname: user.last_name, email: user.email})
    }
  }

  const handleNightsCount = () => {
    const nights =  (new Date(bookingData.checkin) - new Date(bookingData.checkout)) / 24 / 60 / 60 / 1000 * (-1)
    return nights
  }

  const handleOnChange = (e) => {
    setBookingData({...bookingData, [e.target.name]: e.target.value})
  }

  return (
    <>
      <Col md={5} >
        <Form.Group className="mb-3">
          <Form.Label>Érkezés: </Form.Label>
          <Form.Control size="sm" disabled name="checkin" type="text" value={bookingData.checkin ? bookingData.checkin : ""} className={validationErrors.checkin ? "form-control is-invalid" : "form-control"}/>
          {validationErrors.checkin && <Form.Control.Feedback type="invalid">{validationErrors.checkin}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Távozás: </Form.Label>
          <Form.Control size="sm" disabled name="checkout" type="text" value={bookingData.checkout ? bookingData.checkout : ""} className={validationErrors.checkout ? "form-control is-invalid" : "form-control"}/>
          {validationErrors.checkout && <Form.Control.Feedback type="invalid">{validationErrors.checkout}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Éjszakák száma: </Form.Label>
          <Form.Control size="sm" disabled name="checkout" type="text" value={bookingData.checkout && bookingData.checkin ? handleNightsCount() : ""} className={validationErrors.checkout ? "form-control is-invalid" : "form-control"}/>
        </Form.Group>
        <Form.Group 
          className="mb-3"
        >
          <Form.Label>Vendégek száma:</Form.Label>
          <Form.Select
            className={validationErrors.persons ? "form-control is-invalid" : "form-control"}
            size="sm"
            name="persons"
            value={bookingData && bookingData.persons ? bookingData.persons : "default" }
            onChange={(e) => handleOnChange(e)}
          >
            <option value="default" disabled selected></option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Select>
          {validationErrors.persons && <Form.Control.Feedback type="invalid">{validationErrors.persons}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check 
            size="sm"
            name="mycheckbox"
            type="checkbox" 
            label="más adataival szeretnék foglalni"
            onChange={(e) => handleCheckbox(e)}
          />
        </Form.Group>
      </Col>
      <Col md={5} className="">
        <Form.Group className="mb-3">
          <Form.Label>Keresztnév:</Form.Label>
          <Form.Control size="sm" name="firstname" type="text" onChange={(e) => handleOnChange(e)} value={bookingData.firstname} className={validationErrors.firstname ? "form-control is-invalid" : "form-control"}/>
          {validationErrors.firstname && <Form.Control.Feedback type="invalid">{validationErrors.firstname}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Vezetéknév:</Form.Label>
          <Form.Control size="sm" name="lastname" type="text" onChange={(e) => handleOnChange(e)} value={bookingData.lastname} className={validationErrors.lastname ? "form-control is-invalid" : "form-control"}/>
          {validationErrors.lastname && <Form.Control.Feedback type="invalid">{validationErrors.lastname}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control size="sm" name="email" type="text" onChange={(e) => handleOnChange(e)} value={bookingData.email} className={validationErrors.email ? "form-control is-invalid" : "form-control"}/>
          {validationErrors.email && <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Telefon:</Form.Label>
          <Form.Control size="sm" name="phone" type="text" onChange={(e) => handleOnChange(e)} value={bookingData.phone ? bookingData.phone : ""} className={validationErrors.phone ? "form-control is-invalid" : "form-control"} placeholder="+36707776666"/>
          {validationErrors.phone && <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3 policy">
          <Form.Check className="d-flex align-items-start" onChange={(e) => {
            setCheckedCheckbox(!checkedCheckbox)
          }} type="checkbox" label="Elolvastam, megértettem és elfogadom az Adatkezelési Tájékoztatóban foglaltakat" />
        </Form.Group>
        <Button 
          className="mt-3 w-50" 
          variant="success"
          onClick={reserveForUser}
          disabled={!bookingData.checkin || !bookingData.checkout || !bookingData.firstname || !bookingData.lastname || !bookingData.email || !bookingData.phone || !bookingData.persons || !checkedCheckbox || isLoadingReservationsForUser}
        >
          {isLoadingReservationsForUser && <Spinner
            className="me-2"
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />}
          {!isLoadingReservationsForUser ? "Foglalás" : "Foglalás..."}
        </Button>
      </Col>
    </>
  )
}

export default UserForm
