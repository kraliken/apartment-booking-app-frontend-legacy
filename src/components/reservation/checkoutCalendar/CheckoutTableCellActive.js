import React, { useState } from 'react'
import { Col } from 'react-bootstrap'
import '../TableCell.scss'

const TableCellActive = ({ coldate, darkgreen, colclassgreen, colclassinactive, colvalue, bookingData, setBookingData, lastCheckoutDate }) => {
  
  const [checkoutYellow, setCheckoutYellow] = useState(false)

  const checkoutClickHandler = (date) => {
    
    setCheckoutYellow(!checkoutYellow)
    !checkoutYellow ? setBookingData({...bookingData, checkout: date}) : setBookingData({...bookingData, checkout: ""})

  }
  
  return (
    <>
      <div
        // eslint-disable-next-line no-mixed-operators
        className={!bookingData.checkin || lastCheckoutDate && lastCheckoutDate <= coldate || coldate <= bookingData.checkin
                    ? `${colclassinactive} text-center p-1 table-cell`
                    : coldate === bookingData.checkout && bookingData.checkin
                    ? `${darkgreen} text-center p-1 table-cell`
                    : `${colclassgreen} text-center p-1 table-cell`}
        onClick={() => {
          if(bookingData.checkin){
            checkoutClickHandler(coldate)
          }
        }}
        >
          {colvalue}
        </div>
    </>
  )
}

export default TableCellActive
