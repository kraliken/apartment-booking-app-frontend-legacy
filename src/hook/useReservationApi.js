import { useState } from 'react'
import reservationApi from '../api/reservationApi'

const useReservationApi = () => {

  const [reservationsToCheckin, setReservationsToCheckin] = useState([])
  const [reservationsToCheckout, setReservationsToCheckout] = useState([])
  const [isLoadingReservationsForUser, setIsLoadingReservationsForUser] = useState(false);
  const [isLoadingReservationsForAdmin, setIsLoadingReservationsForAdmin] = useState(false);
  const [isLoadingDeleteReservation, setIsLoadingDeleteReservation] = useState(false);
  const [isLoadingReserveForAdmin, setIsLoadingReserveForAdmin] = useState(false);
  const [currentUserReservations, setCurrentUserReservations] = useState([])
  const [adminReservations, setAdminReservations] = useState([])
  const [successReservation, setSuccessReservation] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})
  const [adminDates, setAdminDates] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAllReservationsForUser = async () => {
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.getAllReservationsForUser()
    if (response.status === 200) {
      setReservationsToCheckin(response.data.checkinArray)
      setReservationsToCheckout(response.data.checkoutArray)
    }
    setIsLoadingReservationsForUser(false)
  }

  const userReserve = async (reservationDataOfUser) => {
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.userReserve(reservationDataOfUser)
    if (response.status === 200) {
      setSuccessReservation(true)
      setTimeout(() => {
        // setSuccessReservation(false)
        // history.push("/auth/current_reservation")
      }, 4000)
      setIsLoadingReservationsForUser(false)
    }
    if (response.status === 404) {
      setValidationErrors(response.data)
      setIsLoadingReservationsForUser(false)
    }
  }

  const getCurrentReservationsForUser = async () => {
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.getCurrentReservationsForUser()
    if (response.status === 200) {
      setCurrentUserReservations(response.data.userReservations)
    }
    setIsLoadingReservationsForUser(false)
  }

  const getCurrentReservationsForAdmin = async () => {
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.getCurrentReservationsForAdmin()
    if (response.status === 200) {
      console.log(response.data);
      setCurrentUserReservations(response.data.userCurrentReservations)
      setAdminReservations(response.data.adminReservations)
    }
    setIsLoadingReservationsForUser(false)
  }

  const getAllReservationsForAdmin = async () => {
    setIsLoadingReservationsForAdmin(true)
    const response = await reservationApi.getAllReservationsForAdmin()
    if (response.status === 200) {
      setReservationsToCheckin(response.data.checkinArray)
      setReservationsToCheckout(response.data.checkoutArray)
      setAdminDates(response.data.adminArray)
    }
    setIsLoadingReservationsForAdmin(false)
  }

  const adminReserve = async (reservationDataOfAdmin) => {
    setIsLoadingReserveForAdmin(true)
    const response = await reservationApi.adminReserve(reservationDataOfAdmin)
    if (response.status === 200) {
      setAdminDates([...adminDates, response.data.savedReservation])
    }
    if (response.status === 404) {
      setIsLoadingReserveForAdmin(false)
    }
    setIsLoadingReserveForAdmin(false)
  }

  const adminReserveForUser = async (reservationDataOfUser) => {
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.userReserve(reservationDataOfUser)
    if (response.status === 200) {
      setSuccessReservation(true)
      // history.push("/auth/current_reservation")
    }
    if (response.status === 404) {
      setValidationErrors(response.data)
      setIsLoadingReservationsForUser(false)
    }
    setIsLoadingReservationsForUser(false)
  }

  const deleteReservation = async (id) => {
    setIsLoadingDeleteReservation(true)
    const response = await reservationApi.deleteReservation(id)
    if (response.status === 200) {
      getCurrentReservationsForAdmin()
      handleClose()
    }
    if (response.status === 404) {
      setValidationErrors(response.data)
      setIsLoadingDeleteReservation(false)
    }
    setIsLoadingDeleteReservation(false)
  }


  const publicRequestForReservations = async () => {
    console.log("hook");
    setIsLoadingReservationsForUser(true)
    const response = await reservationApi.publicRequestForReservations()
    if (response.status === 200) {
      setReservationsToCheckin(response.data)
    }
    if (response.status === 404) {

    }
    setIsLoadingReservationsForUser(false)
  }


  return {
    getCurrentReservationsForAdmin,
    getCurrentReservationsForUser,
    publicRequestForReservations,
    getAllReservationsForAdmin,
    getAllReservationsForUser,
    adminReserveForUser,
    deleteReservation,
    adminReserve,
    userReserve,
    handleClose,
    handleShow,
    show,
    adminDates,
    validationErrors,
    adminReservations,
    successReservation,
    reservationsToCheckin,
    reservationsToCheckout,
    currentUserReservations,
    isLoadingReserveForAdmin,
    isLoadingDeleteReservation,
    isLoadingReservationsForUser,
    isLoadingReservationsForAdmin
  }

}

export default useReservationApi

