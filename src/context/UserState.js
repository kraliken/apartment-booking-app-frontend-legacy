import { useReducer } from "react"
import UserContext from "./user-context"
import userReducer from "./user-reducer"

import { GET_AUTH_USER } from "./user-actions"

const UserState = (props) => {

  const initialState = {
    user: {},
    isAuth: false
  }

  const [state, dispatch] = useReducer(userReducer, initialState)

  const getAuthUser = (user) => {
    dispatch({
      type: GET_AUTH_USER,
      payload: user
    })
  }

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isAuth: state.isAuth,
        getAuthUser
      }}
    >
      {props.children}
    </UserContext.Provider>
  )

}

export default UserState
