import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createApi = () => {

  const client = axios.create({
    baseURL: `https://apartment-booking-app-backend-legacy.azurewebsites.net/api/reservations`
  })

  // loginkor meghívni, átadni neki a jwt-t
  const authorize = (jwt) => {
    client.defaults.headers['authorization'] = jwt;
  }

  const getAllReservationsForUser = async () => {
    try {
      const response = await client.get("/user")
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const userReserve = async ({ checkin, checkout, nights, firstname, lastname, email, phone, persons, googleId }) => {
    try {
      const response = await client.post("/user", { checkin, checkout, nights, firstname, lastname, email, phone, persons, googleId })
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const getCurrentReservationsForUser = async () => {
    try {
      const response = await client.get("/current/user")
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const getCurrentReservationsForAdmin = async () => {
    try {
      const response = await client.get("/current/admin")
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const getAllReservationsForAdmin = async () => {
    try {
      const response = await client.get("/admin")
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const adminReserve = async (reservationDataOfAdmin) => {
    try {
      const response = await client.post("/admin", reservationDataOfAdmin)
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const adminReserveForUser = async ({ checkin, checkout, nights, firstname, lastname, email, phone, persons, googleId }) => {
    try {
      const response = await client.post("/user", { checkin, checkout, nights, firstname, lastname, email, phone, persons, googleId })
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const deleteReservation = async (id) => {
    try {
      const response = await client.delete(`/${id}`)
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const publicRequestForReservations = async () => {
    // console.log("kérés");
    try {
      const response = await client.get(`/public`)
      console.log(response);
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  return {
    authorize,
    getAllReservationsForUser,
    getCurrentReservationsForUser,
    getCurrentReservationsForAdmin,
    userReserve,
    getAllReservationsForAdmin,
    adminReserve,
    adminReserveForUser,
    deleteReservation,
    publicRequestForReservations
  }

}

const reservationApi = createApi()

export default reservationApi