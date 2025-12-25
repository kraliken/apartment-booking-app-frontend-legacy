import axios from 'axios'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const createApi = () => {

  const client = axios.create({
    baseURL: `${API_BASE_URL}/api/login`
  })

  const getGoogleAuthUrl = async () => {
    try {
      const response = await client.get("/")
      console.log(response.data);
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }

  const getGoogleUserData = async ({ code: userAuthCode }) => {
    try {
      const response = await client.post("/", { code: userAuthCode })
      return response
    } catch (error) {
      console.log(error);
      return error.response
    }
  }


  return { getGoogleAuthUrl, getGoogleUserData }

}

const loginApi = createApi()

export default loginApi