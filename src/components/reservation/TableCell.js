import React from 'react'
import { Col } from 'react-bootstrap'
import './TableCell.scss'

const TableCell = ({ colclass, colvalue }) => {
  return (
    <div className={`${colclass} text-center p-1 table-cell`}>{colvalue}</div>
  )
}

export default TableCell
