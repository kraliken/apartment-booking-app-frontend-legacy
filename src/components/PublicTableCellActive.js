import React from 'react'
import { Col } from 'react-bootstrap'

const PublicTableCellActive = ({ 
  coldate, 
  colclassgreen, 
  colvalue
}) => {


  return (
    <>
      <div className={`${colclassgreen} p-1 table-cell`} >
        {colvalue}
      </div>
      
    </>
  )
}

export default PublicTableCellActive
