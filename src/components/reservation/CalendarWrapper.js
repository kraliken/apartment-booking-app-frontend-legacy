import React from 'react'
import { Col } from 'react-bootstrap'
import CheckinCalendar from './checkinCalendar/CheckinCalendar'
import CheckoutCalendar from './checkoutCalendar/CheckoutCalendar'

const CalendarWrapper = ({ 
  reservationsToCheckin, 
  bookingData, 
  setBookingData, 
  reservationsToCheckout, 
  lastCheckoutDate 
}) => {
    
  return (
    <>
      <Col md={5}>
        <CheckinCalendar                                      
          reservationsToCheckin={reservationsToCheckin}
          bookingData={bookingData}
          setBookingData={setBookingData}
        />
      </Col>
      <Col md={5} className="mt-5 mt-md-0">
        <CheckoutCalendar                   
          reservationsToCheckout={reservationsToCheckout}
          bookingData={bookingData}
          setBookingData={setBookingData}
          lastCheckoutDate={lastCheckoutDate}
        />
      </Col>
    </>
  )
}

export default CalendarWrapper
