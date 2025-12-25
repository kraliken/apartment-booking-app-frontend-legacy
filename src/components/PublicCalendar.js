import useCalendar from '../hook/useCalendar';
import { Button, Badge, Col, Row } from 'react-bootstrap';
import { GrNext, GrPrevious } from "react-icons/gr";
import TableCell from './reservation/TableCell';
import PublicTableCellActive from './PublicTableCellActive';

const PublicCalendar = ({ 
  // reservationsToCheckin,

  // setNewAdminReservations, 
  // newAdminReservations,
  reservationsToCheckin, 
  // bookingData, 
  // setBookingData, 
  // adminReservations,
  // setAdminReservations, 
  // adminDates
 }) => {

  const { today, calendarRows, selectedDate, daysShort, monthNames, getNextMonth, getPrevMonth } = useCalendar();
  
  return (
    <>
      <Row className="mb-3">
        <Col className="font-weight-bold d-flex align-items-center justify-content-star">
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
            <GrNext className="fs-5"/>
          </Button>              
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        {daysShort.map(day => (
          <Col
            className="text-center border border-white font-weight-bold p-0 col-1 admin-calendar-text"
            key={`${day}-checkin`}
          >
            {day}
          </Col>
        ))}
      </Row>

      {Object.values(calendarRows).map((cols, index) => {
        
        return <Row key={`${index}-checkin`} className="justify-content-center admin-calendar-text">
          {cols.map(col => {
            return (
              // ha van ilyen checkin és nem egyezik a hónap, akkor inactive és piros
              reservationsToCheckin && reservationsToCheckin.includes(col.date) && new Date(col.date).getMonth() !== selectedDate.getMonth()
                ? <TableCell
                    key={`${col.date}-checkin`}
                    colclass={`${col.classes} inactive custom-red border border-white p-0 col-1`}
                    colvalue={col.value}
                  />
              // ha van ilyen checkin és egyezik a hónap, akkor piros
                : reservationsToCheckin && reservationsToCheckin.includes(col.date) && new Date(col.date).getMonth() === selectedDate.getMonth()
                ? <TableCell
                    key={`${col.date}-checkin`}
                    colclass={`${col.classes} custom-red border border-white p-0 col-1`}
                    colvalue={col.value}
                  />
                : new Date(col.date).getMonth() === selectedDate.getMonth() && today.toLocaleString().substr(0, 13) < col.date
                ? <PublicTableCellActive
                    key={`${col.date}-public`}
                    coldate={col.date}
                    colclassgreen={`${col.classes} custom-green text-center border border-white p-0 col-1`}
                    colvalue={col.value}
                  />
                : <TableCell
                    key={`${col.date}-checkin`} 
                    colclass={`${col.classes} custom-green inactive text-center border border-white p-0 col-1`}
                    colvalue={col.value}
                  /> 
            )
          })}
        </Row>
      })}
      <Row className="admin-calendar-text">
        <Col>
          <Badge className="custom-green fw-normal mt-3 mb-1">foglalható</Badge >
        </Col>
      </Row>
      <Row className="admin-calendar-text">
        <Col>
          <Badge className="custom-red fw-normal mb-1">foglalt</Badge >
        </Col>
      </Row>                 
    </>
  )
}

export default PublicCalendar
