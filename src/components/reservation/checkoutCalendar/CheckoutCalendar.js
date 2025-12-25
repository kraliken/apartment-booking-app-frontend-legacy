import React from 'react'
import CheckoutTableCellActive from './CheckoutTableCellActive'
import useCalendar from '../../../hook/useCalendar';
import { Button, Badge, Col, Row } from 'react-bootstrap';
import { GrNext, GrPrevious } from "react-icons/gr";
import TableCell from '../TableCell';
import '../TableCell.scss'

const CheckoutCalendar = ({ reservationsToCheckout, bookingData, setBookingData, lastCheckoutDate }) => {

  const { today, calendarRows, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar()

  // console.log(reservationsToCheckout);


return(
  <>
    {reservationsToCheckout && 
      <>
        <Row>
          <Col className="mb-3 ps-3 fs-5">
            Távozás:
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="font-weight-bold d-flex align-items-center justify-content-start">
            <Button 
              className="d-flex justify-content-center align-items-center p-2"
              variant="outline-light"
              disabled={today.getMonth() >= selectedDate.getMonth() && today.getFullYear() === selectedDate.getFullYear()}
              onClick={getPrevMonth}
            >
              <GrPrevious className="fs-4"/>
            </Button>
          </Col>
          <Col className="font-weight-bold d-flex align-items-center justify-content-center">
            <Row>
              <Col className="col-12 text-center text-uppercase fs-5">{monthNames[selectedDate.getMonth()]}</Col>
              <Col className="col-12 text-center fs-6">{selectedDate.getFullYear()}</Col>
            </Row>
          </Col>
          <Col className="font-weight-bold d-flex align-items-center justify-content-end">
            <Button 
              className="d-flex justify-content-center align-items-center p-2"
              variant="outline-light"
              onClick={getNextMonth}
            >
              <GrNext className="fs-4"/>
            </Button>              
          </Col>
        </Row>

        <Row className="justify-content-center">
          {daysShort.map(day => (
            <div
              className="text-center border border-white font-weight-bold table-cell"
              key={`${day}-checkout`}
            >
              {day}
            </div>
          ))}
        </Row>

        {Object.values(calendarRows).map((cols, index) => {
          return <Row className="d-flex justify-content-center" key={`${index}-checkout`}>
            {cols.map(col => {
              return (
                reservationsToCheckout.includes(col.date) 
                  ? <TableCell
                      key={`${col.date}-checkout`}
                      colclass={`${col.classes} custom-red border border-white inactive`}
                      colvalue={col.value}
                    />
                  : new Date(col.date).getMonth() === selectedDate.getMonth() && today.toLocaleString().substr(0, 12).replaceAll(". ", "-") < col.date
                  ? <CheckoutTableCellActive
                      key={`${col.date}-checkout`}
                      coldate={col.date}
                      colclassinactive={`${col.classes} custom-green text-center border border-white inactive`}
                      darkgreen={`${col.classes} selected text-center border border-white`}
                      colclassgreen={`${col.classes} cursor custom-green text-center border border-white`}
                      colvalue={col.value}
                      bookingData={bookingData}
                      setBookingData={setBookingData}
                      lastCheckoutDate={lastCheckoutDate}
                    />
                  : <TableCell
                      key={`${col.date}-checkout`}
                      colclass={`${col.classes} custom-green inactive text-center border border-white`}
                      colvalue={col.value}
                    /> 
              )
            })}
          </Row>
        })}
        <Row>
          <Col>
            <Badge className="custom-green fw-normal mt-3 mb-1">foglalható</Badge >
          </Col>
        </Row>
        <Row>
          <Col>
            <Badge className="selected fw-normal mb-1">kiválasztva</Badge >
          </Col>
        </Row>                 
      </>
    }
  </>
)
  
}

export default CheckoutCalendar
