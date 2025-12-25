import React from 'react'
import { Col, Row, Button, Badge } from 'react-bootstrap';
import useCalendar from '../../../hook/useCalendar';
import { GrNext, GrPrevious } from "react-icons/gr";
import TableCell from '../TableCell';
import CheckinTableCellActive from '../checkinCalendar/CheckinTableCellActive';

const StepperCheckin = ({ reservationsToCheckin, bookingData, setBookingData }) => {

  const { today, calendarRows, selectedDate,daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();

  return (
    <>
      {reservationsToCheckin && 
        <>
          <Row className="mb-3">
            <Col className="col-2 font-weight-bold d-flex align-items-center justify-content-start">
              <Button 
                className="d-flex justify-content-center align-items-center p-2"
                variant="outline-light"
                disabled={today.getMonth() >= selectedDate.getMonth() && today.getFullYear() === selectedDate.getFullYear()}
                onClick={getPrevMonth}
              >
                <GrPrevious className="fs-5"/>
              </Button>
            </Col>
            <Col className="font-weight-bold d-flex align-items-center justify-content-center">
              <Row>
                <Col className="col-12 text-center text-uppercase fs-5">{selectedDate.getFullYear()} - {monthNames[selectedDate.getMonth()]}</Col>
                {/* <Col className="col-12 text-center fs-6">{selectedDate.getFullYear()}</Col> */}
              </Row>
            </Col>
            <Col className="col-2 font-weight-bold d-flex align-items-center justify-content-end">
              <Button 
                className="d-flex justify-content-center align-items-center p-2"
                variant="outline-light"
                onClick={getNextMonth}
              >
                <GrNext className="fs-5"/>
              </Button>              
            </Col>
          </Row>

          <Row className="justify-content-center">
            {daysShort.map(day => (
              <div
                className="text-center border border-white font-weight-bold p-0 table-cell"
                key={`${day}-checkin`}
              >
                {day}
              </div>
            ))}
          </Row>
          
          {Object.values(calendarRows).map((cols, index) => {
            return <Row className="d-flex justify-content-center" key={`${index}-checkin`}>
              {cols.map(col => {
                return (
                  // ha van ilyen checkin és nem egyezik a hónap, akkor inactive és piros
                  reservationsToCheckin.includes(col.date) && new Date(col.date).getMonth() !== selectedDate.getMonth()
                    ? <TableCell
                        key={`${col.date}-checkin`}
                        colclass={`${col.classes} inactive custom-red border border-white`}
                        colvalue={col.value}
                      />
                  // ha van ilyen checkin és egyezik a hónap, akkor piros
                  : reservationsToCheckin.includes(col.date) && new Date(col.date).getMonth() === selectedDate.getMonth()
                    ? <TableCell
                        key={`${col.date}-checkin`}
                        colclass={`${col.classes} custom-red border border-white`}
                        colvalue={col.value}
                      />
                    : new Date(col.date).getMonth() === selectedDate.getMonth() && today.toLocaleString().substr(0, 13) < col.date
                    ? <CheckinTableCellActive
                        key={`${col.date}-checkin`}
                        coldate={col.date}
                        darkgreen={`${col.classes} cursor selected text-center border border-white`}
                        colclassgreen={`${col.classes} cursor custom-green text-center border border-white`}
                        colvalue={col.value}
                        bookingData={bookingData}
                        setBookingData={setBookingData}
                      />
                    : <TableCell
                        key={`${col.date}-checkin`} 
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
          <Row>
            <Col>
              <Badge className="custom-red fw-normal">foglalt</Badge >
            </Col>
          </Row>
        </>
      }
    </>
  )
}

export default StepperCheckin
