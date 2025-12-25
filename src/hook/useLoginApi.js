import React, { useContext, useState } from 'react'
import loginApi from '../api/loginApi'
import reservationApi from '../api/reservationApi'
import jwt_decode from 'jwt-decode';
import userContext from '../context/user-context';
import { useHistory } from 'react-router-dom';

const useLoginApi = () => {

  const { getAuthUser } = useContext(userContext)
  let history = useHistory();

  const [loginError, setLoginError] = useState(false)
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)

  const getGoogleAuthUrl = async () => {
    const response = await loginApi.getGoogleAuthUrl()
    if(response.status === 200) {
      window.location.href = response.data.authURL
    }else{
      setLoginError(true)
    }
  }

  const getGoogleUserData = async ({ code: userAuthCode }) => {
    console.log("loading");
    setIsLoadingLogin(true)
    const response = await loginApi.getGoogleUserData({ code: userAuthCode })
    if(response.status === 200) {
      reservationApi.authorize(response.data.token)
      localStorage.setItem("jwtToken", response.data.token)
      const decoded = jwt_decode(response.data.token)
      getAuthUser(decoded)
      history.push("/auth/reservation");
      setIsLoadingLogin(false)
    }else{
      history.push("/");
      setIsLoadingLogin(false)
    }
    setIsLoadingLogin(false)
  }

  return {
    getGoogleAuthUrl,
    getGoogleUserData,
    isLoadingLogin,
    loginError
  }
}

export default useLoginApi
