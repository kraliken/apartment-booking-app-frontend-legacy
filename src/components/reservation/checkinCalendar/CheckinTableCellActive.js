import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import '../TableCell.scss'

const TableCellActive = ({ coldate, darkgreen, colclassgreen, colvalue, bookingData, setBookingData, checkout }) => {
  
  const [checkinYellow, setCheckinYellow] = useState(false)
  
  const checkinClickHandler = (date) => {

    console.log(date);
    
    setCheckinYellow(!checkinYellow)
    !checkinYellow ? setBookingData({...bookingData, checkin: date, checkout: ""}) : setBookingData({...bookingData, checkin: ""})

  }
  
  return (
    <>
      <div className={coldate === bookingData.checkin ? `${darkgreen} pointer p-1 table-cell` : `${colclassgreen} pointer p-1 table-cell`} onClick={() => checkinClickHandler(coldate)}>{colvalue}</div>
    </>
  )
}

export default TableCellActive
