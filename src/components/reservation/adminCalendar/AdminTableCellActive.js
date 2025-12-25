import React, { useContext } from 'react'
import { Col } from 'react-bootstrap'
import userContext from '../../../context/user-context'

const TableCellActive = ({ 
  setNewAdminReservations, 
  newAdminReservations, 
  coldate, 
  darkgreen, 
  colclassgreen, 
  colvalue
}) => {

  const { user } = useContext(userContext)

  return (
    <>
      <div className={newAdminReservations.find(reservation => reservation.checkin === coldate) ? `${darkgreen} p-1 table-cell` : `${colclassgreen} p-1 table-cell`} onClick={() => {
        
        if(newAdminReservations.find(reservation => reservation.checkin === coldate)){
          
          let newArray = [...newAdminReservations].filter(reservation => reservation.checkin !== coldate)
          setNewAdminReservations(newArray)
          
        }else{
          console.log(coldate)

          let date = new Date(coldate)
          date = new Date(date.setDate(date.getDate() + 1))
          date = date.toLocaleString().substr(0, 13)

          setNewAdminReservations([...newAdminReservations, {
            checkin: coldate,
            checkout: date,
            nights: 1,
            googleId: user.googleId
          }])

        }}}
      >
        {colvalue}
      </div>
      
    </>
  )
}

export default TableCellActive
