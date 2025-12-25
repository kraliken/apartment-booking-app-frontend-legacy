import React from 'react'
import { Form } from 'react-bootstrap'


const StepperConfirmation = ({
  bookingData, 
  validationErrors,
  reserveForUser,
}) => {

  const handleNightsCount = () => {
    const nights =  (new Date(bookingData.checkin) - new Date(bookingData.checkout)) / 24 / 60 / 60 / 1000 * (-1)
    return nights
  }

  return (
    <>
      <Form.Group className="mb-3 px-2">
        <Form.Label>Érkezés: </Form.Label>
        <Form.Control size="sm" disabled name="checkin" type="text" value={bookingData.checkin} className={validationErrors.checkin ? "form-control is-invalid" : "form-control border-0"}/>
        {validationErrors.checkin && <Form.Control.Feedback type="invalid">{validationErrors.checkin}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group className="mb-3 px-2">
        <Form.Label>Távozás: </Form.Label>
        <Form.Control size="sm" disabled name="checkout" type="text" value={bookingData.checkout} className={validationErrors.checkout ? "form-control is-invalid" : "form-control border-0"}/>
        {validationErrors.checkout && <Form.Control.Feedback type="invalid">{validationErrors.checkout}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group className="mb-3 px-2">
        <Form.Label>Éjszakák száma: </Form.Label>
        <Form.Control size="sm" disabled name="checkout" type="text" value={bookingData.checkout && bookingData.checkin ? handleNightsCount() : ""} className={validationErrors.nights ? "form-control is-invalid" : "form-control border-0"}/>
        {validationErrors.nights && <Form.Control.Feedback type="invalid">{validationErrors.nights}</Form.Control.Feedback>}
      </Form.Group>
      <Form.Group className="mb-3 px-2">
        <Form.Label>Vendégek száma: </Form.Label>
        <Form.Control size="sm" disabled name="persons" type="text" value={bookingData.persons} className={validationErrors.persons ? "form-control is-invalid" : "form-control border-0"}/>
      </Form.Group>
              <Form.Group className="mb-3 px-2">
          <Form.Label>Keresztnév:</Form.Label>
          <Form.Control size="sm" disabled name="firstname" type="text" value={bookingData.firstname} className={validationErrors.firstname ? "form-control is-invalid" : "form-control border-0"}/>
          {validationErrors.firstname && <Form.Control.Feedback type="invalid">{validationErrors.firstname}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label>Vezetéknév:</Form.Label>
          <Form.Control size="sm" disabled name="lastname" type="text" value={bookingData.lastname} className={validationErrors.lastname ? "form-control is-invalid" : "form-control border-0"}/>
          {validationErrors.lastname && <Form.Control.Feedback type="invalid">{validationErrors.lastname}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3 px-2">
          <Form.Label>Email:</Form.Label>
          <Form.Control size="sm" disabled name="email" type="text" value={bookingData.email} className={validationErrors.email ? "form-control is-invalid" : "form-control border-0"}/>
          {validationErrors.email && <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>}
        </Form.Group>
        <Form.Group className="mb-3 px-2" >
          <Form.Label>Telefon:</Form.Label>
          <Form.Control size="sm" disabled name="phone" type="text" value={bookingData.phone ? bookingData.phone : ""} className={validationErrors.phone ? "form-control is-invalid" : "form-control border-0"} placeholder="+36707776666"/>
          {validationErrors.phone && <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>}
        </Form.Group>
    </>
  )
}

export default StepperConfirmation
